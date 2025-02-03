"use client";

import DirectusImageClient from "@/components/shared/directus-image-client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Icon } from "@/types/directus-schema";
import { Loader } from "lucide-react";
import React from "react";

interface FormData {
  message: string;
}

const TalkToLeChat = ({
  placeholder,
  actionUrl,
  actionIcon,
}: {
  placeholder: string;
  actionUrl: string;
  actionIcon: Icon;
}) => {
  const [formData, setFormData] = React.useState<FormData>({
    message: "",
  });
  const [submitted, setSubmitted] = React.useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitted(true);
    window.open(
      actionUrl + `?q=${encodeURIComponent(formData.message)}`,
      "_blank",
    );
    setSubmitted(false);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="relative flex w-full max-w-[539px] items-center justify-center"
    >
      <div className="flex h-[50px] w-full items-center bg-background p-sm">
        <Input
          type="text"
          id="message"
          name="message"
          placeholder={placeholder}
          className="w-full border-none shadow-none placeholder:opacity-65 focus-visible:outline-none focus-visible:ring-0 dark:placeholder:opacity-90"
          value={formData?.message}
          onChange={handleChange}
        />
        <Button
          size="icon"
          className="size-[26px] dark:bg-mistral-orange"
          type="submit"
        >
          {submitted ? (
            <Loader className="animate-spin" />
          ) : actionIcon ? (
            <DirectusImageClient width="19" height="14" asset={actionIcon} />
          ) : null}
        </Button>
      </div>
    </form>
  );
};

export default TalkToLeChat;
