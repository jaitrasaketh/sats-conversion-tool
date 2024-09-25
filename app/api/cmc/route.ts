import { NextRequest, NextResponse } from "next/server";
const CMC_PRO_API_KEY = process.env.CMC_API_KEY;
export async function GET(request: NextRequest) {
    try {
        if (!CMC_PRO_API_KEY){
            throw new Error("CMC_API_KEY is not defined in environment variables");
        }
        const url = "https://pro-api.coinmarketcap.com/v2/cryptocurrency/quotes/latest"
        const parameters = new URLSearchParams({
            slug: 'bitcoin',
            convert: 'INR'
          });
        const response = await fetch(`${url}?${parameters}`,{
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                'X-CMC_PRO_API_KEY': CMC_PRO_API_KEY,
            },
        })    
        const data = await response.json();
        console.log(data['data']['1']['quote']['INR']['price'])
        return NextResponse.json(data['data']['1']['quote']['INR']['price'])  
    } catch (err){
        console.log(err)
        return NextResponse.json({a: 1})
    }
}