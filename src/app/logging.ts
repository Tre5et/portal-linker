'use server';

import {appendFile} from "node:fs";

export async function logPageViewPath(page: string) {
    let time = new Date()
    let str = `${time.toLocaleString("en-uk", { timeZone: "CET" })} | ${page}`
    console.log("page-view: " + str)
    appendFile("logs/views.log", `${str}\n`, () => {})
}