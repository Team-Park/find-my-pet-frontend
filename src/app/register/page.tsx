'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { TimePicker } from "@/components/ui/TimePicker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { MapFirst } from "../_components/MapFirst";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover";



const formSchema = z.object({
  title: z.string().min(2, {
    message: "제목을 입력해 주세요.",
  }),
  phoneNum: z.any(),
  gratuity: z.any(),
  gender: z.any(),
  description: z.any(),
  place: z.any(),
  image: z.any(),
  dateTime: z.date(),
});


export default function LostPetRegister() {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
    },
  });

  const watchValues = form.watch()

  // 2. Define a submit handler.
  const onSubmit = async(values: z.infer<typeof formSchema>) => {
    console.log(values)
  }


  return (
    <div className="flex justify-center">
        <div className="w-[768px]">
            <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>제목</FormLabel>
                        <FormControl>
                            <Input placeholder="글의 제목을 입력해 주세요." {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="phoneNum"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>연락처</FormLabel>
                            <FormControl>
                                <Input placeholder="연락처를 입력해 주세요." {...field}/>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="gratuity"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>사례금</FormLabel>
                            <FormControl>
                                <Input placeholder="사례금을 입력해 주세요." {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
                <div className="grid grid-cols-2 gap-6">
                    <FormField
                        control={form.control}
                        name="dateTime"
                        render={({ field }) => (
                            <FormItem className="flex flex-col">
                            <FormLabel className="text-left">실종 시간</FormLabel>
                            <Popover>
                                <FormControl>
                                <PopoverTrigger asChild>
                                    <Button
                                    variant="outline"
                                    className={cn(
                                        "justify-start text-left font-normal",
                                        !field.value && "text-muted-foreground"
                                    )}
                                    >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {field.value ? (
                                        format(field.value, "PPP HH:mm:ss")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                    </Button>
                                </PopoverTrigger>
                                </FormControl>
                                <PopoverContent className="w-auto p-0">
                                <Calendar
                                    mode="single"
                                    selected={field.value}
                                    onSelect={field.onChange}
                                    initialFocus
                                />
                                <div className="p-3 border-t border-border">
                                    <TimePicker
                                    setDate={field.onChange}
                                    date={field.value}
                                    />
                                </div>
                                </PopoverContent>
                            </Popover>
                            </FormItem>
                        )}
                    />
                

                    <FormField
                        control={form.control}
                        name="gender"
                        render={({ field }) => (
                            <FormItem className="space-y-3">
                            <FormLabel>성별</FormLabel>
                            <FormControl>
                                <RadioGroup
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                className="flex gap-3"
                                >
                                    <FormItem className="flex items-center space-x-1 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="all" />
                                        </FormControl>
                                        <FormLabel className="female">암컷</FormLabel>
                                    </FormItem>
                                    <FormItem className="flex items-center space-x-1 space-y-0">
                                        <FormControl>
                                        <RadioGroupItem value="male" />
                                        </FormControl>
                                        <FormLabel className="font-normal">수컷</FormLabel>
                                    </FormItem>
                                </RadioGroup>
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="place"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>실종 장소</FormLabel>
                        <FormControl>
                            <Input placeholder="정확한 주소를 입력해 주세요." {...field} />
                        </FormControl>
                        <div className="w-full h-[300px] bg-blue-200">
                            <MapFirst address={watchValues.place}/>
                        </div>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                        <FormLabel>상세 설명</FormLabel>
                        <FormControl>
                            <Textarea placeholder="실종 동물에 대한 상세 설명을 작성해 주세요." className="resize-none" {...field} />
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />

                <FormField
                    control={form.control}
                    name="image"
                    render={({ field }) => (
                        <FormItem className="w-[30%]">
                        <FormLabel>사진</FormLabel>
                        <FormControl>
                            <Input id="picture" type="file" {...field}/>
                        </FormControl>
                        <FormMessage />
                        </FormItem>
                    )}
                />
                <div className="w-full flex justify-end">
                    <Button type="submit" size="lg" variant="default">등록하기</Button>
                </div>
            </form>
            </Form>
        </div>
    </div>
  );
}
