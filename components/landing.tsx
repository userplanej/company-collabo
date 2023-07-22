"use client";

import { SignInIcon } from "../icons";
import { MarketingLayout } from "../layouts/Marketing";
import { signIn } from "next-auth/react";
import { Button, LinkButton } from "../primitives/Button";
import { Container } from "../primitives/Container";
import escapeContainer from "primitives/Container/Container.module.css";
import clsx from "clsx";
import {
  ComponentProps,
  ForwardedRef,
  LegacyRef,
  ReactNode,
  createRef,
  useEffect,
  useRef,
} from "react";
import styles from "./landing.module.css";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

interface FeatureProps extends Omit<ComponentProps<"div">, "title"> {
  description: ReactNode;
  title: ReactNode;
  actionButton?: boolean;
}

function Feature({
  title,
  description,
  className,
  actionButton = false,
  ...props
}: FeatureProps) {
  return (
    <div className={clsx(className, styles.featuresFeature)} {...props}>
      <div className={clsx("h-auto", styles.featuresInnerFeature)}>
        <h4 className={styles.featuresFeatureTitle}>{title}</h4>
        <div className={styles.featuresFeatureDescription}>{description}</div>
        {actionButton ? (
          <div className=" pt-4 flex justify-end">
            <LinkButton
              href="http://www.userplane.co.kr:3002/"
              target="_blank"
              variant="secondary"
            >
              더 알아보기
            </LinkButton>
          </div>
        ) : null}
      </div>
    </div>
  );
}

const people = [
  {
    id: 0, // Used in JSX as a key
    name: "윤 정원",
    profession: "mathematician",
    accomplishment: "spaceflight calculations",
    imageId: "MK3eW3A",
  },
  {
    id: 1, // Used in JSX as a key
    name: "Sahbi Braham",
    profession: "chemist",
    accomplishment: "discovery of Arctic ozone hole",
    imageId: "mynHUSa",
  },
  {
    id: 2, // Used in JSX as a key
    name: "이 재휴",
    profession: "physicist",
    accomplishment: "electromagnetism theory",
    imageId: "bE7W1ji",
  },
  {
    id: 3, // Used in JSX as a key
    name: "곽 철",
    profession: "chemist",
    accomplishment:
      "pioneering cortisone drugs, steroids and birth control pills",
    imageId: "IOjWm71",
  },
];

export function LandingPage() {
  gsap.registerPlugin(ScrollTrigger);
  const ref_container_trigger: LegacyRef<HTMLDivElement> = createRef();
  const ref_container_target: ForwardedRef<HTMLDivElement> = createRef();

  // useEffect(() => {
  //   console.log("ref_container_trigger.current");

  //   console.log(ref_container_trigger.current);

  //   const target_element = ref_container_target.current;
  //   console.log("ref_container_target.current");
  //   console.log(target_element);
  //   const target_div = target_element!.querySelector(".fixed-header");
  //   console.log("target_div ");
  //   console.log(target_div);
  // }, []);
  //CONTEXT BOUNDING ANIMATION
  useEffect(() => {
    const trigger_element = ref_container_trigger.current;
    const target_element = ref_container_target.current;
    gsap.fromTo(
      // @ts-ignore
      target_element!.querySelector(".fixed-header"), // Target
      {
        y: 0,
        ease: "power3",
      },
      {
        y: -40,
        ease: "power3",
        duration: 0.01,
        scrollTrigger: {
          // @ts-ignore
          trigger: trigger_element.querySelector(".context-bound"), // Trigger
          start: "top 60%",
          end: "top 9999",

          scrub: true,
        },
      }
    );
  }, []);

  function getImageUrl(person: { imageId: string }) {
    return "https://i.imgur.com/" + person.imageId + "s.jpg";
  }

  return (
    <>
      <MarketingLayout ref={ref_container_target}>
        <Container className={styles.section}>
          <div className={styles.heroInfo}>
            <h1 className={styles.heroTitle}>
              Web Apps that Create Realistic&nbsp;Story
            </h1>
            <p className={styles.heroLead}>
              지금부터 우리회사가 머물고 싶은 웹 , 좋은 웹을 클라이언트 님들에게
              전달하기 위하여 정의한 몇가지 기본원칙을 말씀드리겠습니다.
              유져플래인이 준비한 고객님께 드리는 원칙에 대해 자세히&nbsp;
              알아보세요.
            </p>
          </div>
          <div className={styles.heroActions}>
            <Button icon={<SignInIcon />} onClick={() => signIn()}>
              Sign in
            </Button>
            <LinkButton
              href="http://www.userplane.co.kr:3002/"
              target="_blank"
              variant="secondary"
            >
              Learn more
            </LinkButton>
          </div>
        </Container>

        <div
          className={clsx(
            "container containerMedium landing_section__nz_XR Container_container__v_mnk Container_containerMedium__K77DB"
          )}
          ref={ref_container_trigger}
        >
          <h2 className={clsx("context-bound", styles.sectionTitle)}>
            우리회사 서비스
          </h2>
          <div className={clsx("flex flex-row h-[500px]")}>
            <div className="grid gap-4 pr-4 h-auto">
              <Feature
                actionButton={true}
                description={
                  <>
                    우리는 인터넷 사용자로부터 발견되어지기 쉽고 관리자들에게는
                    관리하기 용이한, 성능이 우수한 Modern Web Apps 를 개발하여
                    공급합니다
                    <br />
                    <br />
                    유져플래인이 준비한 고객님께 드리는 좋은 웹을 전달해드리기
                    위한 3가지 원칙에 대해 자세히&nbsp;알아보세요.
                  </>
                }
                title="Modern Web Apps"
              />
              <Feature
                className="leading-loose"
                description={
                  <>
                    <div className="flex">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        className="h-4 w-4 mt-0.5 text-emerald-500"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      &nbsp;UI/UX Web Design
                    </div>
                    <div className="flex">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        className="h-4 w-4 mt-0.5 text-emerald-500"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      &nbsp;Custom Web Development
                    </div>
                    <div className="flex">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        className="h-4 w-4 mt-0.5 text-emerald-500"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      &nbsp;Website Experience Strategy
                    </div>
                    <div className="flex">
                      <svg
                        stroke="currentColor"
                        fill="currentColor"
                        stroke-width="0"
                        viewBox="0 0 20 20"
                        aria-hidden="true"
                        className="h-4 w-4 mt-0.5 text-emerald-500"
                        height="1em"
                        width="1em"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      &nbsp;Comprehensive Web Audit
                    </div>
                  </>
                }
                title="Our Services"
              />
            </div>
            <div className="grid">
              <Feature
                description={
                  <>
                    We are a team of Senior Software Engineers that have built
                    and developed web apps at scale. You can trust us.
                    {people.map((person) => (
                      <div
                        key={person.id}
                        className="flex py-4 align-middle items-start justify-between"
                      >
                        <Image
                          src={getImageUrl(person)}
                          alt={person.name}
                          width={100}
                          height={100}
                          className=" rounded-full object-cover"
                        />
                        <p className=" pl-4">
                          <b>{person.name}</b>
                          {" " + person.profession + " "}
                          known for {person.accomplishment}
                        </p>
                      </div>
                    ))}
                  </>
                }
                title="Built by experts"
              />
            </div>
          </div>
        </div>
      </MarketingLayout>
    </>
  );
}
