"use client";
import { Button, Input, Snippet, Spinner, Textarea } from "@nextui-org/react";
import { NextUIProvider } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import "./scroll.css";
import AnimatedCursor from "react-animated-cursor";

export default function Home() {
  const router = useRouter();

  const handleBack = () => {
    router.back();
    return;
  };
  const questionsAns = [
    {
      question: "What is Clippy?",
      answer:
        "Clippy is a web application that allows you to create and customize your own version of the classic Clippy assistant. You can generate, save, and share your personalized Clippy with others.",
    },
    {
      question: "How do I create my own Clippy?",
      answer:
        "To create your Clippy, click on the 'Create' button on the homepage. You'll be guided through a series of steps to customize your Clippy's appearance and behavior.",
    },
    {
      question: "Can I upload my own files?",
      answer:
        "Yes, you can upload files by clicking on the 'Upload File' button. This allows you to personalize your Clippy with your own documents or images.",
    },
    {
      question: "Is there a way to share my Clippy?",
      answer:
        "Once you've created and saved your Clippy, you can share it with others by providing them with the unique URL generated for your Clippy.",
    },
    {
      question: "Do I need an account to use Clippy?",
      answer:
        "No, you don't need to create an account to use Clippy. The service is available to all users without requiring a login.",
    },
    {
      question: "Who created Clippy?",
      answer:
        "Clippy was developed by Subinoy, a developer passionate about bringing a touch of nostalgia and fun to modern web applications.",
    },
    {
      question: "Is Clippy free to use?",
      answer: "Yes, Clippy is completely free to use for all users.",
    },
    {
      question: "What are the future plans for Clippy?",
      answer:
        "We plan to add more customization options, interactive features, and support for more file types in future updates.",
    },
  ];
  return (
    <NextUIProvider>
      <AnimatedCursor 
      innerSize={8}
      outerSize={35}
      innerScale={1}
      outerScale={2}
      color="194, 198, 204"
      />
      <main className="  flex min-h-screen flex-col items-center align-middle justify-between p-24 background content-center w-full ">
        <Button
          onPress={handleBack}
          className="absolute top-6 left-4"
          color="primary"
        >
          {" "}
          BACK
        </Button>
        <div
          className={`text-black  overflow-y-scroll h-[80vh] flex flex-col  gap-4   pb-[10px] pt-[10px] pr[10px] w-[95vw] sm:w-1/2 bg-slate-200/50 p-5 rounded-3xl scrolltarget`}
        >
          {questionsAns.map((data, index) => {
            return (
              <div
                key={index}
                className="h-auto opening-animation border-b-1 border-dotted pb-[20px] border-black border-width   w-[100%] flex flex-col gap-2"
              >
                <p className="flex gap-2 flex-row">
                  <span>{index + 1}</span>
                  <span>{data.question}</span>
                </p>
                <p>{data.answer}</p>
              </div>
            );
          })}
        </div>
      </main>
    </NextUIProvider>
  );
}
