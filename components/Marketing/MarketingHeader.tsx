import clsx from "clsx";
import Link from "next/link";
import { ComponentProps, ForwardedRef, useEffect } from "react";
import { SignInIcon } from "../../icons";
import { Button } from "../../primitives/Button";
import { Container } from "../../primitives/Container";
import { Logo } from "../Logo";
import styles from "./MarketingHeader.module.css";
import { signIn } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Gradient } from "public/MeshGradient.js";
import React from "react";

export const MarketingHeader = React.forwardRef(
  (
    { className, ...props }: ComponentProps<"header">,
    ref: ForwardedRef<HTMLDivElement>
  ) => {
    useEffect(() => {
      const gradient = new Gradient();
      // @ts-ignore
      gradient.initGradient("#gradient-canvas");
    }, []);

    return (
      <header ref={ref} className={clsx(className, styles.header)} {...props}>
        <div
          className={clsx(
            "fixed-header flex justify-between text-white max-w-7xl gap-4 mx-auto border border-[#000000]/[0.16] p-4 rounded-full",
            "fixed w-[95%] inset-x-0 top-10 backdrop-blur-md z-50",
            styles.container
          )}
        >
          <div className="hidden md:block">
            <Link href="/">
              <Logo />
            </Link>
          </div>

          <div className="flex md:hidden">
            <div className=" fixed inset-0 top-4 w-full  z-50 flex items-center justify-end align-middle px-4">
              <div className="w-full flex flex-row items-center justify-between  backdrop-blur-md border border-[#FFFFFF]/[0.16] px-4 py-2 rounded-full ">
                <svg
                  stroke="currentColor"
                  fill="currentColor"
                  stroke-width="0"
                  viewBox="0 0 512 512"
                  className="text-black h-5 w-5"
                  height="1em"
                  width="1em"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M432 176H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16zM432 272H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16zM432 368H80c-8.8 0-16-7.2-16-16s7.2-16 16-16h352c8.8 0 16 7.2 16 16s-7.2 16-16 16z"></path>
                </svg>
              </div>
            </div>
          </div>

          <div className="hidden md:flex">
            <div
              className={clsx(
                "flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 py-2 space-x-6 rounded-full",
                "bg-[#303238] border border-[#FFFFFF]/[0.35] text-[14px] items-center justify-center px-6 font-medium overflow-hidden"
              )}
            >
              <canvas
                className="gradientStyles"
                id="gradient-canvas"
                data-transition-in
              />
              <a
                className="relative group bg-transparent hover:text-white/[0.64] transition duration-200"
                href="#"
              >
                Pricing
              </a>

              <a
                target="__blank"
                rel="noopener noreferrer"
                href="#"
                className="relative group bg-transparent hover:text-white/[0.64] transition duration-200"
              >
                GitHub
              </a>

              <a
                target="__blank"
                rel="noopener noreferrer"
                href="#"
                className="relative group bg-transparent hover:text-white/[0.64] transition duration-200"
              >
                Discord
              </a>

              <a
                target="__blank"
                rel="noopener noreferrer"
                href="#"
                className="relative group bg-transparent hover:text-white/[0.64] transition duration-200"
              >
                Company
              </a>

              <a
                target="__blank"
                rel="noopener noreferrer"
                href="#"
                className="relative group bg-transparent hover:text-white/[0.64] transition duration-200"
              >
                Changelog
              </a>
            </div>
          </div>

          <div className="hidden md:flex md:space-x-4 md:items-center">
            <button
              className="group relative rounded-full p-px text-[0.8125rem] font-semibold leading-6 shadow-lg shadow-zinc-700 text-white"
              onClick={() => signIn()}
            >
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)]  opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>

              <div className="relative z-10 rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 py-1 px-4 ring-1 ring-white/10 flex items-center space-x-2">
                <span>Sign in</span>
              </div>

              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </button>
          </div>
        </div>
      </header>
    );
  }
);

// export function MarketingHeader({
//   className,
//   ...props
// }: ComponentProps<"header">) {
//   useEffect(() => {
//     const gradient = new Gradient();
//     // @ts-ignore
//     gradient.initGradient("#gradient-canvas");
//   }, []);
//   return (
//     <header className={clsx(className, styles.header)} {...props}>
//       <div
//         className={clsx(
//           "fixed-header flex justify-between text-white max-w-7xl gap-4 mx-auto border border-[#000000]/[0.16] p-4 rounded-full",
//           "fixed w-[95%] inset-x-0 top-10 backdrop-blur-md z-50",
//           styles.container
//         )}
//       >
//         <Link href="/">
//           <Logo />
//         </Link>

//         <div
//           className={clsx(
//             "flex absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 py-2 space-x-6 rounded-full",
//             "bg-[#303238] border border-[#FFFFFF]/[0.35] text-[14px] items-center justify-center px-6 font-medium overflow-hidden"
//           )}
//         >
//           <canvas
//             className="gradientStyles"
//             id="gradient-canvas"
//             data-transition-in
//           />
//           <a
//             className="relative group bg-transparent hover:text-white/[0.64] transition duration-200"
//             href="/pricing"
//           >
//             Pricing
//           </a>

//           <a
//             target="__blank"
//             rel="noopener noreferrer"
//             href="https://github.com/getcursor/cursor"
//             className="relative group bg-transparent hover:text-white/[0.64] transition duration-200"
//           >
//             GitHub
//           </a>

//           <a
//             target="__blank"
//             rel="noopener noreferrer"
//             href="https://discord.com/invite/PJEgRywgRy"
//             className="relative group bg-transparent hover:text-white/[0.64] transition duration-200"
//           >
//             Discord
//           </a>

//           <a
//             target="__blank"
//             rel="noopener noreferrer"
//             href="https://anysphere.co"
//             className="relative group bg-transparent hover:text-white/[0.64] transition duration-200"
//           >
//             Company
//           </a>

//           <a
//             target="__blank"
//             rel="noopener noreferrer"
//             href="https://changelog.cursor.sh"
//             className="relative group bg-transparent hover:text-white/[0.64] transition duration-200"
//           >
//             Changelog
//           </a>
//         </div>

//         <div className="flex space-x-4 items-center">
//           <button className="group relative rounded-full p-px text-[0.8125rem] font-semibold leading-6 shadow-lg shadow-zinc-700 text-white">
//             <span className="absolute inset-0 overflow-hidden rounded-full">
//               <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)]  opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
//             </span>

//             <div className="relative z-10 rounded-full bg-gradient-to-b from-zinc-800 to-zinc-900 py-1 px-4 ring-1 ring-white/10 flex items-center space-x-2">
//               <span>Sign in</span>
//             </div>

//             <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
//           </button>
//         </div>
//       </div>
//     </header>
//   );
// }
