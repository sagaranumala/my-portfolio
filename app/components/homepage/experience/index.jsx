// ...existing code...
"use client";

import { experiences } from "@/utils/data/experience";
import Image from "next/image";
import { BsPersonWorkspace } from "react-icons/bs";
import codeAnimation from '../../../assets/lottie/code.json';
import dynamic from "next/dynamic";
const AnimationLottie = dynamic(() => import("../../helper/animation-lottie"), { ssr: false });
import GlowCard from "../../helper/glow-card";

function Experience() {
  return (
    <div id="experience" className="relative z-50 border-t my-12 lg:my-24 border-[#25213b]">
      <Image
        src="/section.svg"
        alt="Hero"
        width={1572}
        height={795}
        className="absolute top-0 -z-10"
      />

      <div className="flex justify-center my-5 lg:py-8">
        <div className="flex  items-center">
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
          <span className="bg-[#1a1443] w-fit text-white p-2 px-5 text-xl rounded-md">
            Experiences
          </span>
          <span className="w-24 h-[2px] bg-[#1a1443]"></span>
        </div>
      </div>

      <div className="py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex justify-center items-start">
            <div className="w-full h-full">
              <AnimationLottie animationPath={codeAnimation} />
            </div>
          </div>

          <div>
            <div className="flex flex-col gap-6">
              {
                experiences.map(item => (
                  <GlowCard key={item.id} identifier={`experience-${item.id}`}>
                    <div className="p-3 relative">
                      <Image
                        src="/blur-23.svg"
                        alt="Hero"
                        width={1080}
                        height={200}
                        className="absolute bottom-0 opacity-80"
                      />
                      <div className="flex justify-center">
                        <p className="text-xs sm:text-sm text-[#16f2b3]">
                          {item.duration}
                        </p>
                      </div>

                      <div className="flex items-start gap-x-8 px-3 py-5">
                        <div className="text-violet-500 transition-all duration-300 hover:scale-125">
                          <BsPersonWorkspace size={36} />
                        </div>

                        <div className="flex-1">
                          <div className="flex items-baseline justify-between">
                            <div>
                              <p className="text-base sm:text-xl mb-1 font-medium uppercase">
                                {item.title}
                              </p>
                              {item.role && (
                                <p className="text-sm sm:text-base text-gray-300">
                                  {item.role}
                                </p>
                              )}
                              {item.company && (
                                <p className="text-sm sm:text-base">
                                  {item.company}
                                </p>
                              )}
                            </div>

                            {item.location && (
                              <p className="text-xs text-gray-400">
                                {item.location}
                              </p>
                            )}
                          </div>

                          {item.responsibilities && item.responsibilities.length > 0 && (
                            <ul className="mt-3 list-disc list-inside text-sm text-gray-200">
                              {item.responsibilities.map((r, i) => (
                                <li key={i}>{r}</li>
                              ))}
                            </ul>
                          )}

                          {item.stack && item.stack.length > 0 && (
                            <p className="mt-3 text-xs text-[#b7fbe6]">
                              Tech: {item.stack.join(', ')}
                            </p>
                          )}

                          {item.link && (
                            <a
                              href={item.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-block mt-3 text-xs text-[#16f2b3] underline"
                            >
                              View more
                            </a>
                          )}
                        </div>
                      </div>
                    </div>
                  </GlowCard>
                ))
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Experience;
// ...existing code...