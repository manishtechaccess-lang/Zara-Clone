"use client";
import { useEffect, useRef, useState } from "react";
import "../../style/style.css";
import Link from "next/link";
import gsap from "gsap";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import FloatingFormInput from "@/components/custom/FloatingFormInput";

const Signup = () => {
  const navigate = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const signinRef = useRef<HTMLDivElement>(null);

  const [emailActive, setEmailActive] = useState(false);
  const [passwordActive, setPasswordActive] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  useEffect(() => {
    startImageAnimation();
  }, []);

  const startImageAnimation = () => {
    if (!imageRef.current || !containerRef.current) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.inOut" },
    });

    // gsap.set(imageRef.current, {
    //   scale: 1.5,
    //   filter: "blur(15px)",
    //   clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
    // });
    tl.to(imageRef.current, {
      clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
      duration: 2,
      ease: "expo.inOut",
    });
    tl.to(
      imageRef.current,
      {
        clipPath: "polygon(0% 0%, 50% 0%, 50% 100%, 0% 100%)",
        duration: 2,
        ease: "expo.inOut",
      },
      "-=0.2"
    );

    tl.to(
      containerRef.current,
      {
        zIndex: "10",
        duration: 0.2,
      },
      "-=0.2"
    );
    tl.to(
      ".stagger-item-1",
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "ease.inOut",
      },
      "-=1.2"
    );
  };

  // const handleRegisterClick = () => {
  //   if (!imageRef.current || !containerRef.current) return;
  //   const tl = gsap.timeline();

  //   tl.to(imageRef.current, {
  //     clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
  //     duration: 2,
  //     ease: "expo.inOut",
  //   });
  //   tl.to(
  //     imageRef.current,
  //     {
  //       clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)",
  //     },
  //     "-=0.2"
  //   );
  //   tl.to(
  //     containerRef.current,
  //     {
  //       zIndex: "50",
  //       duration: 0.2,
  //     },
  //     "-=0.2"
  //   );
  //   tl.to(
  //     ".stagger-item-1",
  //     {
  //       x: 100,
  //       // opacity: 0,
  //       filter: "blur(15px)",
  //       duration: 0.8,
  //       stagger: 0.15,
  //       ease: "ease.inOut",
  //       onComplete: () => {
  //         gsap.delayedCall(0, () => {
  //           navigate.push("/auth/Login");
  //         });
  //       },
  //     },
  //     "-=1.2"
  //   );
  // };

  const loginSchema = z.object({
    email: z.string({ error: "Password field is required" }),
    password: z.string().min(1, "Password field is required"),
    name: z.string().min(1, "Name field is required"),
  });
  type loginValues = z.infer<typeof loginSchema>;

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });

  const onSubmit = (data: loginValues) => {
    console.log(data.email, data.password);
  };

  return (
    <main className="relative min-h-screen">
      <section
        ref={containerRef}
        className="sec-1 h-[100vh] w-full absolute top-0 left-0 z-50 overflow-hidden"
      >
        <div ref={imageRef} className="w-full h-full sign-in-img">
          <img
            src="/img/signin-img.jpg"
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      </section>
      <section
        className="sec-2 w-[40%] py-4 px-24 absolute right-0 top-0 space-y-12 z-20 overflow-hidden"
        ref={signinRef}
      >
        <div className="header stagger-item-1">
          <Link
            href="/"
            className="font-against tracking-[-0.2rem] lg:tracking-[-0.5rem] uppercase text-3xl sm:text-4xl md:text-5xl lg:text-8xl"
          >
            sarojini
          </Link>
        </div>

        <div className="form-sec space-y-8">
          <h2 className="font-gilLight uppercase stagger-item-1">Log in</h2>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-8 stagger-item-1"
            >
              <FloatingFormInput
                control={form.control}
                name="email"
                label="Email"
                type="text"
              />

              <FloatingFormInput
                control={form.control}
                name="password"
                label="Password"
                type="password"
              />

              <FloatingFormInput
                control={form.control}
                name="name"
                label="Name"
                type="text"
              />

              <div className="pass-forgot">
                <button className="font-gilLight text-xs cursor-pointer text-neutral-800">
                  Have you forgotten your password?
                </button>
              </div>

              <div className="w-full flex space-x-10 space-y-3 mt-18 stagger-item-1">
                <div className="btn">
                  <button
                    type="submit"
                    className="text-center px-8 text-black text-xs border border-black font-clashLight uppercase py-2 tracking-[0.05rem] cursor-pointer"
                  >
                    Create Account
                  </button>
                </div>

                <div>
                  <div
                    onClick={() => navigate.push("/auth/Login")}
                    // onClick={handleRegisterClick}
                    className="text-center px-8 text-white text-xs border border-black bg-black font-clashLight uppercase py-2 tracking-[0.05rem] cursor-pointer"
                  >
                    Login
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </section>
    </main>
  );
};

export default Signup;
