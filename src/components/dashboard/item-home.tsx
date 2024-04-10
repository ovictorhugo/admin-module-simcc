import { Link } from "react-router-dom";
import { Alert } from "../ui/alert";
import { useState } from "react";

interface Props {
    title: string,
    value: string,
    url: string,
    children: any
  }
  

export function ItemDashboard(props:Props) {

    

    return(
        <Link to={props.url} className="">
        <Alert className="full dark:hover:bg-neutral-900 hover:bg-gray-100 transition-all w-full items-end flex flex-col justify-between">
            <h3 className="text-5xl font-bold ">{props.value}</h3>
            <div className="flex justify-between gap-3 items-center w-full">
            <div className="flex p-2 bg-gray-200 dark:bg-neutral-600 items-center h-8 w-8 rounded-lg">{props.children}</div>
            <p className="text-right">{props.title}</p>

            
            </div>

        </Alert>
        </Link>
    )
}