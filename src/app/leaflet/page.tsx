'use client'
import Image from "next/image";
import img from '../../static/image/guide.jpg'
import { useReactToPrint } from "react-to-print";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../_components/ui/dialog";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Input } from "../_components/ui/input";
import { Label } from "../_components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {QRCodeSVG} from 'qrcode.react';
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
  } from "@/components/ui/form";
import { SubmitHandler, useForm } from "react-hook-form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const formSchema = z.object({
    title: z.string()
      .min(2, { message: "제목을 입력해 주세요." })
      .nonempty({ message: "제목은 필수 입력 항목입니다." }),
    contact: z.string()
      .regex(/^010\d{8}$/, { message: "올바른 핸드폰 번호를 입력해 주세요." }),
    gratuity: z.string()
      .nonempty({ message: "사례금 없을 시 0을 입력해 주세요." }),
    age: z.string()
      .nonempty({ message: "나이를 입력해 주세요." }),
    type: z.string()
      .nonempty({ message: "동물 종을 입력해 주세요." }),
    gender: z.enum(['male', 'female']),
    description: z.string()
      .min(1, { message: "상세 설명을 입력해 주세요." })
      .nonempty({ message: "상세 설명은 필수 입력 항목입니다." }),
    place: z.string()
      .nonempty({ message: "장소를 입력해 주세요." }),
    feature: z.string()
      .nonempty({ message: "특징을 입력해 주세요." }),
    photo1: z.any(),
    photo2: z.any(),
    chatURL: z.any(),
    date: z.string()
    .nonempty({ message: "실종날짜를 입력해 주세요." })
  });
type FormSchemaType = z.infer<typeof formSchema>;

export default function Leaflet(){
    const contentRef = useRef<HTMLDivElement>(null);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            contact: "",
            gratuity: "",
            age: "",
            gender: "male", // 기본값 설정
            description: "",
            place: "",
            feature: "",
            date: "",
            photo1: undefined,
            photo2: undefined,
            chatURL: "",
          },
      });
      
    const reactToPrintFn = useReactToPrint({ contentRef });
    const [title, setTitle] = useState('제목을 입력해주세요.')
    const [type, setType] = useState('종')
    const [gender, setGender] = useState('성별')
    const [age, setAge] = useState('나이')
    const [date, setDate] = useState('실종 날짜')
    const [place, setPlace] = useState('실종 장소')
    const [feature, setFeature] = useState('실종 동물 특징')
    const [description, setDescription] = useState('실종 당시 자세한 설명');
    const [gratuity, setGratuity] = useState('사례금');
    const [contact, setContact] = useState('연락처');
    const [photo1, setPhoto1] = useState('');
    const [photo2, setPhoto2] = useState('');
    const [chatURL, setChatURL] = useState('');
    const [preview1, setPreview1] = useState<string|null>(null);
    const [preview2, setPreview2] = useState<string|null>(null);
  
    const handleFileChange = ( event: React.ChangeEvent<HTMLInputElement>, 
        setPreview: React.Dispatch<React.SetStateAction<string | null>>) => {
      const file = event.target.files![0];
      if (file) {
        const reader = new FileReader();
        reader.onload = () => {
            if (typeof reader.result === "string") {
                setPreview(reader.result); // Base64로 변환된 이미지 URL
              }
        };
        reader.readAsDataURL(file);
      }
    };

    const onSubmit: SubmitHandler<FormSchemaType> = (data) => {
        setAge(data.age)
        setChatURL(data.chatURL)
        setDescription(data.description)
        setContact(data.contact)
        setDate(data.date)
        setFeature(data.feature)
        setGender(data.gender)
        setGratuity(data.gratuity)
        setPlace(data.place)
        setTitle(data.title)
        setType(data.type)
      };



    return (
        <div className="w-full h-full flex flex-col gap-10 items-center relative ">
            <div className="flex items-center gap-6">
                <div className="py-2 flex-col w-[600px] rounded-md bg-gray-100 flex items-center justify-center font-bold text-xl">
                    <span>💡 하단에 프린트 및 저장 버튼이 있습니다.</span>
                    <Dialog>
                        <DialogTrigger asChild><Button>전단지 입력하기</Button></DialogTrigger>
                        <DialogContent className="w-[700px] h-full overflow-scroll">
                            <DialogHeader>
                            <DialogTitle>전단지 Form 채우기</DialogTitle>
                            </DialogHeader>
                            <div className="grid w-full items-center gap-3">
                                <Form {...form}> 
                                    <form onSubmit={(e) => {
                                            e.preventDefault(); // 디버깅용
                                            console.log("Submitting form...");
                                            // console.log(values)
                                            form.handleSubmit(onSubmit)(e);
                                        }} className="space-y-8">
                                        <FormField
                                            control={form.control}
                                            name="title"
                                            render={({ field }) => (
                                            <FormItem>
                                                                                                                                                                                                                                                                         <FormLabel>제목</FormLabel>
                                                <FormControl>
                                                <Input placeholder="제목을 입력해주세요." {...field} />
                                                </FormControl>
                                                <FormMessage />
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
                                        <FormField
                                            control={form.control}
                                            name="type"
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>종</FormLabel>
                                                <FormControl>
                                                <Input placeholder={'동물 종을 입력해주세요.'} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="age"
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>나이</FormLabel>
                                                <FormControl>
                                                <Input placeholder={'나이를 입력해주세요.'} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="date"
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>실종날짜</FormLabel>
                                                <FormControl>
                                                <Input placeholder="실종날짜를 입력해주세요." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="place"
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>실종장소</FormLabel>
                                                <FormControl>
                                                <Input placeholder={place} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="feature"
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>특징</FormLabel>
                                                <FormControl>
                                                <Input placeholder="특징을 입력해주세요.    " {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="description"
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>설명</FormLabel>
                                                <FormControl>
                                                <Textarea placeholder="추가적인 설명을 적어주세요." {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="contact"
                                            render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>연락처</FormLabel>
                                                <FormControl>
                                                <Input placeholder="연락처를 입력해주세요." {...field} />
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
                                                <Input placeholder="사례금을 입력해주세요. 원치 않을 경우 입력하지 마세요." {...field} />
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
                                                <FormLabel>목격 제보 오픈채팅 URL</FormLabel>
                                                <FormControl>
                                                <Input placeholder={'목격 제보 오픈채팅 URL을 입력해주세요.'} {...field} />
                                                </FormControl>
                                                <FormMessage />
                                            </FormItem>
                                            )}
                                        />
                                        <div>
                                        <Label htmlFor="picture1">사진1</Label>
                                            <Input
                                            id="picture1"
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleFileChange(e, setPreview1)}
                                            />
                                            {preview1 && (
                                            <div className="mt-2">
                                                <img
                                                src={preview1}
                                                alt="Preview 1"
                                                className="w-full h-auto max-w-xs border border-gray-300 rounded-lg"
                                                />
                                            </div>
                                            )}
                                        </div>
                                        <div>
                                        <Label htmlFor="picture2">사진2</Label>
                                        <Input
                                        id="picture2"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileChange(e, setPreview2)}
                                        />
                                        {preview2 && (
                                        <div className="mt-2">
                                            <img
                                            src={preview2}
                                            alt="Preview 2"
                                            className="w-full h-auto max-w-xs border border-gray-300 rounded-lg"
                                            />
                                        </div>
                                        )}
                                        </div>
                                        <div className="w-full flex justify-end">
                                            <Button type="button" size="lg" variant="default" onClick={async () => {
                                                    // 유효성 검사 실행
                                                    const isValid = await form.trigger();
                                                    if (isValid) {
                                                    // 유효하면 현재 값을 가져와 onSubmit 호출
                                                    const values = form.getValues();
                                                    onSubmit(values);
                                                    } else {
                                                    console.log("Validation failed");
                                                    console.log(form.formState.errors);

                                                    }
                                                }}>
                                                적용
                                            </Button>
                                        </div>                                 
                                    </form>
                                </Form>
                                
                            </div>
                            
                        </DialogContent>
                    </Dialog>
                
                </div>
                
            </div>
            <div className="w-full h-full bg-gray-100 flex flex-col justify-center items-center" ref={contentRef}>
                <div className="sm:text-7xl w-full h-[30%] bg-red-600 flex justify-center items-center text-5xl font-bold text-white flex-col gap-6">
                    {title}
                    <span className="sm:text-xl text-sm">잃어버린 강아지를 찾는 즉시 수거하겠습니다. 떼지 말아주세요. 부탁드립니다.</span>
                </div>
                <div className="w-full h-full flex flex-col">
                    <div className="w-full flex justify-center">
                        <div className="flex gap-5">
                            <div className="flex justify-center items-center relative w-[500px]">
                                {
                                    preview1 &&
                                    <img src={preview1} alt="banner image"/>
                                }
                            </div>
                            <div className="flex justify-center items-center relative w-[500px]">
                                {
                                    preview2 &&
                                    <img src={preview2} alt="banner image"/>
                                }
                            </div>
                        </div>
                    </div>
                    <div className="w-full px-10 flex flex-col gap-6 py-10 relative">
                        <div className="w-full flex flex-col gap-2 sm:text-4xl text-2xl font-bold">
                            <div>⚫️ 실종견 : <span>{type} / {gender === 'male' ? '수컷' : '암컷'} / {age}살</span></div>
                            <div>⚫️ 실종날짜 : <span>{date}</span></div>
                            <div>⚫️ 실종장소 : <span>{place}</span></div>
                            <div>⚫️ 특징 : <span>{feature}</span></div>
                            {gratuity && <div>⚫️ 사례금 : <span>{gratuity}만원</span></div>}
                        </div>
                        <div className="w-full flex flex-col gap-2 sm:text-2xl text-xl font-bold min-h-[170px]">
                            <p>{description}</p>
                        </div>
                        
                        <div className="w-full flex items-center justify-center gap-10 sm:text-6xl text-4xl font-bold h-[200px] relative">
                            TEL) {contact}
                            <div className="absolute right-10 m:w-[120px] sm:h-[120px] w-[80px] h-[80px] flex flex-col justify-center items-center z-100 font-bold sm:text-base text-xs">목격제보<br/> 오픈채팅
                            <QRCodeSVG
                                value={chatURL}
                                title={"제보 오픈채팅 URL"}
                                size={50}
                                bgColor={"#ffffff"}
                                fgColor={"#000000"}
                                level={"L"}
                            />
                            </div>
                        </div>
                        
                    </div>
                    
                </div>
                
            </div>
            <Button size="lg" onClick={() => reactToPrintFn()} className="text-xl">🖨️ 프린트</Button>
        </div>
    )
}