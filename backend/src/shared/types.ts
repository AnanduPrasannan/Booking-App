import { HotelType } from "../model/hotel"


export type UserType ={
    _id:string,
    email:string,
    password:string,
    firstName:string,
    lastName:string
    }
    


export type HotelSearchResponse={

    data:HotelType[],
    pagination:{
        total:number,
        page:number,
        pages:number
    }
}



export type BookingType={

    _id:string,
    userId:string,
    firstName:string,
    lastName:string,
    email:string,
    checkIn:Date,
    checkOut:Date,
    adultCount:number,
    childCount:number,
    totalCost:number
}
export type PaymentIntentResponse={

    paymentIntentId:string,
    clientSecret:string,

    totalCost:number

}