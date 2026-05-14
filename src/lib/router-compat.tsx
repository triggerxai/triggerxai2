// Compatibility shim that maps the @/lib/router-compat API surface used in this
// project to TanStack Router primitives, so ported pages keep working unchanged.
import {
  Link as TSLink,
  useNavigate as useTSNavigate,
  useLocation as useTSLocation,
  type LinkProps as TSLinkProps,
} from "@tanstack/react-router";
import { forwardRef, type AnchorHTMLAttributes, type ReactNode } from "react";

type AnyLinkProps = {
  to: string;
  replace?: boolean;
  state?: unknown;
  className?: string;
  style?: React.CSSProperties;
  children?: ReactNode;
  target?: string;
  rel?: string;
  onClick?: AnchorHTMLAttributes<HTMLAnchorElement>["onClick"];
  "aria-label"?: string;
  title?: string;
};

export const Link = forwardRef<HTMLAnchorElement, AnyLinkProps>(
  ({ to, children, ...rest }, ref) => {
    // External or hash/mail links fall back to a plain anchor.
    if (/^(https?:|mailto:|tel:|#)/.test(to)) {
      return (
        <a ref={ref} href={to} {...rest}>
          {children}
        </a>
      );
    }
    const { state: _ignoredState, ...linkRest } = rest;
    void _ignoredState;
    return (
      <TSLink ref={ref} to={to as TSLinkProps["to"]} {...linkRest}>
        {children}
      </TSLink>
    );
  },
);
Link.displayName = "Link";

type NavLinkRenderProps = { isActive: boolean; isPending: boolean };
export type NavLinkProps = Omit<AnyLinkProps, "className" | "style" | "children"> & {
  className?: string | ((p: NavLinkRenderProps) => string);
  style?: React.CSSProperties | ((p: NavLinkRenderProps) => React.CSSProperties);
  children?: ReactNode | ((p: NavLinkRenderProps) => ReactNode);
  end?: boolean;
};

export const NavLink = forwardRef<HTMLAnchorElement, NavLinkProps>(
  ({ to, className, style, children, end, ...rest }, ref) => {
    const loc = useTSLocation();
    const path = loc.pathname;
    const isActive = end ? path === to : path === to || path.startsWith(to + "/");
    const renderProps = { isActive, isPending: false };
    const cls = typeof className === "function" ? className(renderProps) : className;
    const sty = typeof style === "function" ? style(renderProps) : style;
    const kids = typeof children === "function" ? children(renderProps) : children;
    return (
      <Link ref={ref} to={to} className={cls} style={sty} {...rest}>
        {kids}
      </Link>
    );
  },
);
NavLink.displayName = "NavLink";

export function useNavigate() {
  const navigate = useTSNavigate();
  return (to: string | number, options?: { replace?: boolean; state?: unknown }) => {
    if (typeof to === "number") {
      if (typeof window !== "undefined") window.history.go(to);
      return;
    }
    if (/^(https?:|mailto:|tel:)/.test(to)) {
      if (typeof window !== "undefined") window.location.href = to;
      return;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    navigate({ to: to as any, replace: options?.replace });
  };
}

export function useLocation() {
  const loc = useTSLocation();
  return {
    pathname: loc.pathname,
    search: loc.searchStr ?? "",
    hash: loc.hash ?? "",
    state: (loc as unknown as { state?: unknown }).state,
    key: loc.href,
  };
}
