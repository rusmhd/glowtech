"use client";

import { motion } from "framer-motion";
import { useForm, SubmitHandler } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { FiMapPin, FiMail, FiLoader, FiSend } from "react-icons/fi";
import AnimatedHeading from "./AnimatedHeading";

type Inputs = {
  name: string;
  vehicle: string;
  service: string;
  message: string;
};

export default function Contact() {
  const serviceOptions = ["Body Kits", "Custom Paint", "Performance", "Parts Supply"];

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>({
    mode: "onBlur",
    reValidateMode: "onChange",
  });

  const selectedService = watch("service");

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await fetch("/api/submit-enquiry", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const responseJson = await res.json();

      if (responseJson.success) {
        toast.success(responseJson.message || "Enquiry sent successfully!", {
          style: {
            background: "#171717",
            color: "#fff",
            border: "1px solid #1d3a49",
          },
          iconTheme: {
            primary: "#1d3a49",
            secondary: "#fff",
          },
        });
        reset();
      } else {
        toast.error(responseJson.error || "Submission failed.");
      }
    } catch (error) {
      console.error("Contact form submission failed:", error);
      toast.error("Network error. Please try again or contact us directly.");
    }
  };

  return (
    <motion.section
      id="contact"
      data-theme="black"
      className="section-shell section-grid py-20 md:py-24"
    >
      <Toaster position="bottom-right" reverseOrder={false} />
      <div className="section-inner grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="section-label">Start A Project</p>
          <h2 className="headline-xl mt-3 text-5xl md:text-7xl">
            <span className="sr-only">LET'S DESIGN YOUR NEXT BUILD.</span>
            <AnimatedHeading
              lines={[
                { text: "LET'S DESIGN" },
                { text: "YOUR NEXT BUILD.", className: "text-glow-blue" },
              ]}
              delayStart={0.04}
            />
          </h2>
          <p className="mt-6 max-w-xl text-base md:text-lg leading-relaxed text-white/75">
            Share your platform, inspiration, and target outcome. We will build a custom proposal with scope, timeline, and budget path.
          </p>

          <div className="mt-8 grid gap-3 sm:grid-cols-3">
            <motion.div whileHover={{ y: -3 }} className="panel-soft p-4">
              <p className="text-[10px] uppercase tracking-[0.17em] text-white/55">Response Time</p>
              <p className="mt-1 text-lg font-heading text-white">Within 24h</p>
            </motion.div>
            <motion.div whileHover={{ y: -3 }} className="panel-soft p-4">
              <p className="text-[10px] uppercase tracking-[0.17em] text-white/55">Consultation</p>
              <p className="mt-1 text-lg font-heading text-white">Strategy First</p>
            </motion.div>
            <motion.div whileHover={{ y: -3 }} className="panel-soft p-4">
              <p className="text-[10px] uppercase tracking-[0.17em] text-white/55">Delivery</p>
              <p className="mt-1 text-lg font-heading text-white">Road Ready</p>
            </motion.div>
          </div>

          <div className="mt-8 space-y-5 text-sm">
            <div className="flex items-start gap-3">
              <FiMapPin className="mt-0.5 text-glow-blue" />
              <div>
                <div className="text-[11px] uppercase tracking-[0.15em] text-glow-muted">Studio Access</div>
                <div className="text-white">Appointment-only location shared after enquiry.</div>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <FiMail className="mt-0.5 text-glow-blue" />
              <div>
                <div className="text-[11px] uppercase tracking-[0.15em] text-glow-muted">Direct Contact</div>
                <a href="mailto:builds@glowtech.automotive" className="text-white hover:text-glow-blue">
                  builds@glowtech.automotive
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.06 }}
          className="panel-soft p-7 md:p-9"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-glow-muted">
                Quick Pick Service
              </label>
              <div className="flex flex-wrap gap-2">
                {serviceOptions.map((option) => {
                  const active = selectedService === option;
                  return (
                    <motion.button
                      key={option}
                      type="button"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setValue("service", option, { shouldDirty: true, shouldValidate: true })}
                      className={`border px-3 py-2 text-[10px] uppercase tracking-[0.15em] transition-colors ${
                        active
                          ? "border-glow-blue bg-glow-blue/15 text-white"
                          : "border-white/12 text-white/75 hover:border-white/30"
                      }`}
                    >
                      {option}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-glow-muted">
                Full Name
              </label>
              <input
                type="text"
                placeholder="Full Name"
                className={`w-full border bg-glow-black-700 px-4 py-3 text-white focus:outline-none ${errors.name ? "border-red-500" : "border-glow-black-700 focus:border-glow-blue"}`}
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <span className="mt-1 block text-xs text-red-500">{errors.name.message}</span>}
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-glow-muted">
                Vehicle Details
              </label>
              <input
                type="text"
                placeholder="Make, Model, Year"
                aria-invalid={errors.vehicle ? "true" : "false"}
                className={`w-full border bg-glow-black-700 px-4 py-3 text-white focus:outline-none ${errors.vehicle ? "border-red-500" : "border-glow-black-700 focus:border-glow-blue"}`}
                {...register("vehicle", {
                  required: "Vehicle details are required",
                })}
              />
              {errors.vehicle && <span className="mt-1 block text-xs text-red-500">{errors.vehicle.message}</span>}
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-glow-muted">
                Required Service
              </label>
              <select
                className={`w-full border bg-glow-black-700 px-4 py-3 text-white focus:outline-none ${errors.service ? "border-red-500" : "border-glow-black-700 focus:border-glow-blue"}`}
                {...register("service", { required: "Please select a service" })}
              >
                <option value="" disabled hidden>
                  Select service
                </option>
                <option value="Body Kits">Body Kits</option>
                <option value="Custom Paint">Custom Paint</option>
                <option value="Performance">Performance</option>
                <option value="Parts Supply">Parts Supply</option>
              </select>
              {errors.service && <span className="mt-1 block text-xs text-red-500">{errors.service.message}</span>}
            </div>

            <div>
              <label className="mb-2 block text-[11px] font-semibold uppercase tracking-[0.15em] text-glow-muted">
                Build Brief
              </label>
              <textarea
                rows={4}
                placeholder="Share the look, parts, and result you want..."
                className="w-full resize-none border border-glow-black-700 bg-glow-black-700 px-4 py-3 text-white focus:border-glow-blue focus:outline-none"
                {...register("message")}
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              data-cursor
              data-cursor-label="send"
              className="flex w-full items-center justify-center gap-2 bg-glow-purple px-5 py-3 text-[11px] font-bold uppercase tracking-[0.16em] text-white transition hover:bg-[#24485a] disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? (
                <>
                  <FiLoader className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  Get My Quote
                  <FiSend />
                </>
              )}
            </button>
          </form>
        </motion.div>
      </div>
    </motion.section>
  );
}