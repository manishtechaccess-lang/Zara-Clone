"use client";
import { useEffect, useRef, useState } from "react";
import "../../style/style.css";
import Link from "next/link";
import gsap from "gsap";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const Login = () => {
  // const pathname = usePathname();
  const navigate = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const loginRef = useRef<HTMLDivElement>(null);

  const [emailActive, setEmailActive] = useState(false);
  const [passwordActive, setPasswordActive] = useState(false);
  const [emailValue, setEmailValue] = useState("");
  const [passwordValue, setPasswordValue] = useState("");

  const [authStep, setAuthStep] = useState<"Login" | "Signin">("Login");

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
      scale: 1,
      filter: "blur(0px)",
      duration: 1.7,
    });
    tl.to(
      imageRef.current,
      {
        clipPath: "polygon(50% 0, 100% 0, 100% 100%, 50% 100%)",
        duration: 2,
      },
      "-=0.2"
    );
    tl.fromTo(
      loginRef.current,
      {
        x: -100,
        opacity: 0,
      },
      {
        x: 0,
        opacity: 1,
        duration: 1,
        ease: "ease.inOut",
      },
      "-=1.2"
    );
    tl.to(
      ".stagger-item",
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "ease.inOut",
      },
      "-=1.2"
    );

    tl.to(
      containerRef.current,
      {
        zIndex: "10",
        duration: 0.2,
      },
      "-=0.1"
    );
    tl.to(imageRef.current, {
      filter: "grayscale(100%) sepia(20%)",
      duration: 1,
    });

    // tl.to(imageRef.current, {
    //   scale: 1.02,
    //   duration: 0.3,
    //   yoyo: true,
    //   repeat: 1,
    // });
  };

  const handleRegisterClick = () => {
    gsap.to(containerRef.current, {
      opacity: 0,
      duration: 0.3,
      onComplete: () => {
        navigate.push("/auth/Signin");
      },
    });
  };

  const loginSchema = z.object({
    email: z.string({ error: "Password field is required" }),
    password: z.string().min(1, "Password field is required"),
  });
  type loginValues = z.infer<typeof loginSchema>;

  const form = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: loginValues) => {
    console.log(data.email, data.password);
  };

  return (
    <main className="relative min-h-screen">
      <section className="sec-1 w-[40%] py-4 px-24 space-y-12 absolute left-0 top-0 z-20">
        <div className="header" ref={loginRef}>
          <Link
            href="/"
            className="font-against tracking-[-0.2rem] lg:tracking-[-0.5rem] uppercase text-3xl sm:text-4xl md:text-5xl lg:text-8xl"
          >
            sarojini
          </Link>
        </div>

        <div className="form-sec space-y-8">
          <h2 className="font-gilLight uppercase stagger-item">Log in</h2>

          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 stagger-item"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  const [active, setActive] = useState(false);

                  return (
                    <FormItem
                      className={`relative email ${active ? "active" : ""}`}
                    >
                      <FormControl>
                        <input
                          type="text"
                          className="w-full border-[rgba(0,0,0,0.6)] border-b outline-none font-gilMedium pt-5"
                          {...field}
                          onMouseDown={() => setActive(true)}
                          onFocus={() => setActive(false)}
                        />
                      </FormControl>

                      <FormLabel className="label font-gilLight text-gray-500 text-xs uppercase">
                        Email
                      </FormLabel>

                      <FormMessage className="text-red-500 font-gilRegular" />
                    </FormItem>
                  );
                }}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-gilLight text-gray-500 text-xs uppercase">
                      Password
                    </FormLabel>
                    <FormControl>
                      <input
                        type="password"
                        className="w-full border-[rgba(0,0,0,0.6)] border-b outline-none font-gilMedium"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 font-gilRegular" />
                  </FormItem>
                )}
              />

              <div className="pass-forgot">
                <button className="font-gilLight text-xs cursor-pointer text-neutral-800">
                  Have you forgotten your password?
                </button>
              </div>

              <div className="w-full space-y-3 mt-18 stagger-item">
                <div className="btn w-full">
                  <button
                    type="submit"
                    className="login-btn w-full text-center bg-black text-white text-xs font-clashLight uppercase py-2 tracking-[0.05rem] cursor-pointer"
                  >
                    login
                  </button>
                </div>
                <div className="btn w-full">
                  <div
                    // onClick={() => navigate.push("/auth/Signin")}
                    onClick={handleRegisterClick}
                    className="login-btn w-full text-center border border-black text-neutral-700 text-xs font-clashRegular uppercase py-2 tracking-[0.05rem] cursor-pointer"
                  >
                    Register
                  </div>
                </div>
              </div>
            </form>
          </Form>
        </div>
      </section>
      <section
        ref={containerRef}
        className="sec-2 h-[100vh] w-full absolute top-0 left-0 z-50 overflow-hidden"
      >
        <div ref={imageRef} className="w-full h-full log-in-img">
          <img
            src="/img/login-img.jpg"
            className="w-full h-full object-cover"
            alt=""
          />
        </div>
      </section>
    </main>
  );
};

export default Login;
