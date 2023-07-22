import clsx from "clsx";
import { ComponentProps, ForwardedRef, useEffect, useRef } from "react";
import { MarketingFooter, MarketingHeader } from "../../components/Marketing";
import styles from "./Marketing.module.css";
import React from "react";

// export function MarketingLayout({
//   children,
//   className,
//   ...props
// }: ComponentProps<"div">) {
//   return (
//     <div className={clsx(className, styles.layout)} {...props}>
//       <MarketingHeader />
//       <main>{children}</main>
//       <MarketingFooter className={styles.footer} />
//     </div>
//   );
// }

export const MarketingLayout = React.forwardRef(
  (
    { children, className, ...props }: ComponentProps<"div">,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    return (
      <div className={clsx(className, styles.layout)} {...props}>
        <MarketingHeader ref={ref} />
        <main>{children}</main>
        <MarketingFooter className={styles.footer} />
      </div>
    );
  }
);
