import {Response} from 'express';
import { JwtPayload } from 'jsonwebtoken';
import { v4 } from 'uuid';
import User from '../../models/userModel/userModel';
import Event, { EventAttributes } from '../../models/eventModel/eventModel';
import Order from '../../models/orderModel/payment';
import Ticket from '../../models/ticketModel/ticketModel';
import Earning from '../../models/earningsModel/earningsModel';
import { generateBeautifulTicketPDF } from '../../helpers/ticketGenerator';
// import { generateBeautifulTicketPDF } from '../../helpers/ticketGenerator';

export const userPays = async (request:JwtPayload, response:Response) => {
    try{
        const userId = request.user.id;
        const eventId = request.params.id
        const user = await User.findOne({where: {id:userId}})
        const event = await Event.findOne({where: {id:eventId}}) as unknown as EventAttributes
        const event_owner = await User.findOne({where: {id:event.owner_id}}) as unknown as EventAttributes

        if(!event){
            return response.status(404).json({
                status: `error`,
                message: `Event not found`
            })
        }
        
        if(!user){
            return response.status(404).json({
                status: `error`,
                message: `User does not exist`
            })
        }

        const{cart, totalAmount} = request.body

        const newCart = JSON.parse(cart)
        const getOrders = await Order.findAll({})
        const newOrderNumber = 'DE10001000100'
        let mainOrderNumber:any = ""
        let orderNumArr = []
        if(getOrders.length === 0){
            mainOrderNumber = newOrderNumber
        }else{
            for(let index = 0; index<getOrders.length; index++){
                orderNumArr.push(getOrders[index].order_number)
            }
            for(let index = 0; index<orderNumArr.length; index++){
                orderNumArr[index] = Number(orderNumArr[index].split("").splice(-11).join(""))
            }
            orderNumArr.sort((a:any,b:any)=>a-b)
            let highest = orderNumArr[orderNumArr.length-1]
            mainOrderNumber = `DE${highest + 1}`

        }
        const newOrder = await Order.create({
            id: v4(),
            tickets: JSON.parse(cart),
            amount: totalAmount,
            owner_id: userId,
            order_number: mainOrderNumber,
            event_owner_id: event.owner_id,
            event_id: eventId,
            owner_email: user.email,
            createdAt: new Date(),
            updatedAt: new Date()
        })
        const createdTickets: Ticket[] = [];
        const userEarnings: Earning[] = []

        for (let index = 0; index < newCart.length; index++) {
             const ticket = await Ticket.create({
                id: v4(),
                owner_id: userId,
                event_id: eventId,
                owner_name: user.user_name,
                event_name: event.title,
                event_type: event.type,
                order_number: mainOrderNumber,
                ticket_type: newCart[index].ticket_type,
                ticket_amount: newCart[index].ticket_amount,
                quantity: newCart[index].quantity,
                total_cost: newCart[index].total_amount,
                createdAt: new Date(),
                updatedAt: new Date(),
             });

             const newEarning = await Earning.create({
                id: v4(),
                owner_id: event_owner.id,
                owner_name: event_owner.user_name,
                event_id: eventId,
                order_date: new Date(),
                event_name: event.title,
                order_number: mainOrderNumber,
                ticket_quantity: newCart[index].quantity,
                event_category: event.type,
                ticket_type: newCart[index].ticket_type,
                total_amount: newCart[index].total_amount,
                amount_earned: newCart[index].total_amount * 0.98,
                createdAt: new Date(),
                updatedAt: new Date()
            })

      createdTickets.push(ticket);
      userEarnings.push(newEarning)
    }

        const registeredUser:any = {
        id_of_user: user.id,
        name_of_user: `${user.first_name} ${user.last_name}`,
        image_of_user: user.profile_picture,
        email_of_user: user.email,
        date_purchased: new Date(),
        no_of_tickets: createdTickets.length,
        total_amount_paid: totalAmount
    }

    let eventRegisteredUsers = []
    eventRegisteredUsers = event.registered_users
    eventRegisteredUsers.push(registeredUser)
    eventRegisteredUsers.sort((a:any,b:any)=> a.date_purchased - b.date_purchased)

    const ticketsToBeMailed = []

    for(let index = 0; index<createdTickets.length; index++){
        ticketsToBeMailed.push({
            ticketId: createdTickets[index].id,
            eventName: createdTickets[index].event_name,
            ticketType: createdTickets[index].ticket_type,
            quantity: createdTickets[index].quantity,
            amount: createdTickets[index].total_cost
        })
    }
    

    for(let index = 0; index<ticketsToBeMailed.length; index++){
        await generateBeautifulTicketPDF(ticketsToBeMailed[index], event.event_image)
    }



    const eventTickets = await Ticket.findAll({where: {event_id:eventId}})

    const update = await Event.update({registered_users: eventRegisteredUsers, tickets_bought:eventTickets.length}, {where: { id:eventId }})
    if(newOrder && createdTickets.length !== 0 && userEarnings.length !== 0){
        return response.status(200).json({
            status: `success`,
            message: `Payment Successful`,
            createdTickets,
            userEarnings
        })
    }


    return response.status(400).json({
        status: `error`,
        message: `Payment Unsuccessful`,
    })


    }catch(error:any){
        console.log(error)
        return response.status(500).json({
            status: `error`,
            message: `Internal Server Error`
        })
    }
}