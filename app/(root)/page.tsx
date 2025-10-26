import InterviewCard from "@/components/InterviewCard";
import { Button } from "@/components/ui/button";
import { dummyInterviews } from "@/constants";
import Image from "next/image";
import Link from "next/link";


export default function Home() {
  return (
    <>
      <section className="card-cta">
        <div className="flex justify-between items-center">
          <div className="flex flex-col max-w-lg gap-6">
            <h3 className="text-white text-3xl"> Get Interview-Ready with AI-Powered Practice & Feedback  </h3>
            <p className="text-primary-200">
              Practice real interview questions & get instant feedback.
            </p>

            <Button asChild className="bg-primary-200 rounded-full max-sm:w-full">
              <Link href="/interview" >Start an Interview</Link>
            </Button>
          </div>
          <Image src="/robot.png" alt="robot" width={400} height={400} className="max-sm:hidden" />
        </div>
      </section>

      {/* User Interview */}
      <section>
        <h2> Your Past Interviews </h2>
        <div className="interviews-section">
          {
            dummyInterviews?.map(interview => (
              <InterviewCard key={interview?.id} {...interview} />
            ))
          }
        </div>
      </section>

      {/* Over All Interviews */}
      <section>
        <h2> Pick Your Interview</h2>
      </section>

    </>
  );
}
