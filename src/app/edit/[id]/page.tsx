'use client'

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Textarea } from "@/components/ui/textarea";
import { TimePicker } from "@/components/ui/TimePicker";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import { MapFirst } from "../../_components/MapFirst";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import apiClient from "@/lib/api";
import useLostPet from "@/store/lostPetStore";
import LocalStorage from "@/lib/localStorage";


const formSchema = z.object({
  title: z.string()
    .min(2, { message: "제목을 입력해 주세요." })
    .nonempty({ message: "제목은 필수 입력 항목입니다." }),
  
  phoneNum: z.string()
    .regex(/^010\d{8}$/, { message: "올바른 핸드폰 번호를 입력해 주세요." }),

  gratuity: z.string()
    .nonempty({ message: "사례금 없을 시 0을 입력해 주세요." }),

  gender: z.enum(['male', 'female']),
  description: z.string()
    .min(1, { message: "상세 설명을 입력해 주세요." })
    .nonempty({ message: "상세 설명은 필수 입력 항목입니다." }),

  place: z.string()
    .nonempty({ message: "장소를 입력해 주세요." }),

  images: z.any(),
  time: z.date({
    required_error: "시간을 입력해 주세요.",
    invalid_type_error: "올바른 날짜 형식을 입력해 주세요."
  }).refine((date) => date < new Date(), {
    message: "시간은 현재보다 이전이어야 합니다.",
  }),
  chatURL: z.any(),
  customNickname: z.any(),
  
});
export default function LostPetRegister({ params }: { params: { id: string } }) {
  const router = useRouter()
  const {toast} = useToast()
  const lostPetInfo = useLostPet((state) => state.lostPet)
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { 
      title: lostPetInfo?.title,
      phoneNum: lostPetInfo?.phoneNum,
      gratuity: String(lostPetInfo?.gratuity),
      gender: lostPetInfo?.gender as 'male' | 'female',
      description: lostPetInfo?.description,
      place: lostPetInfo?.place,
      chatURL: lostPetInfo?.chatURL,
      customNickname: lostPetInfo?.customNickname
    },
  });
  const ID = params.id
  

  const watchValues = form.watch(); // 입력 값 모니터링

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const body = {...values, postId: ID, lat:0, lng:0}
    // 3. API 호출
    await apiClient.put(
      `/post`, body)
    .then(() => { 
        toast({
          title: "수정 완료",
          description: "게시글이 수정되었습니다.",
        })
        router.push('/')
    })  
  };

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
            {LocalStorage.getItem('role')?.replace(/"/g, '') === 'ROLE_ADMIN' &&
            <FormField
              control={form.control}
              name="customNickname"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>닉네임</FormLabel>
                  <FormControl>
                    <Input placeholder="닉네임을 입력해주세요." {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />}

            <div className="grid grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="phoneNum"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>연락처</FormLabel>
                    <FormControl>
                      <Input placeholder="연락처를 입력해 주세요." {...field} />
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
                name="time"
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
                            {field.value
                              ? format(field.value, "PPP HH:mm:ss")
                              : "Pick a date"}
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
                            <RadioGroupItem value="female" />
                          </FormControl>
                          <FormLabel>암컷</FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-1 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="male" />
                          </FormControl>
                          <FormLabel>수컷</FormLabel>
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
                    <MapFirst address={watchValues.place} />
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
                    <Textarea
                      placeholder="실종 동물에 대한 상세 설명을 작성해 주세요."
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
                control={form.control}
                name="chatURL"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>오픈채팅 URL</FormLabel>
                    <FormControl>
                      <Input placeholder="오픈채팅 URL을 입력해 주세요." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

        
            <div className="w-full flex justify-end">
              <Button type="submit" size="lg" variant="default">
                수정하기
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
