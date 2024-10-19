import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/app/_components/ui/pagination";
import { Dispatch, SetStateAction } from "react";

interface IProps {
    currentPage: number;
    setCurrentPage: Dispatch<SetStateAction<number>>
}

export default function AbandonmentPagination({currentPage, setCurrentPage}: IProps){
    const page = Array.from({ length: 5 }, (_, i) => 1 + i + Math.floor((currentPage - 1) / 5) * 5);
    return (
        <Pagination className="my-4">
            <PaginationContent>
                <PaginationItem>
                    <PaginationPrevious onClick={() =>  setCurrentPage(currentPage-1)} />
                </PaginationItem>
                {
                 page.map((pageNumber) => {
                    return (
                    <PaginationItem key={pageNumber}>
                        <PaginationLink isActive={pageNumber === currentPage} onClick={() => setCurrentPage(pageNumber)}>{pageNumber}</PaginationLink>
                      </PaginationItem>
                    )
                 })   
                }
                <PaginationItem>
                    <PaginationNext href="#" onClick={() => setCurrentPage(currentPage+1)}/>
                </PaginationItem>
            </PaginationContent>
        </Pagination>
    )
}