import {IOC} from "../config/inversify/inversify.ioc.types";
import DeliveryService from "../service/DeliveryService";
import {WebSocketEvents} from "../config/constants/WebSocketEvents";
import {DeliveryStatus} from "../config/constants/DeliveryStatus";
import Location from "compliance-library/domain/dto/Location";
import DependencyInjectionManager from "compliance-library/config/inversify/DependencyInjectionManager";
import {Socket} from "socket.io";

const deliveryService = DependencyInjectionManager.getInstance().getContainer().get<DeliveryService>(IOC.DeliveryService);

export const webSocketListener = function (io: any) {
    io.on(WebSocketEvents.CONNECTION, (socket: Socket) => {

        socket.on(WebSocketEvents.LOCATION_CHANGED, async (data: { delivery_id: string, location: Location }) => {
            const response: any = await deliveryService.updateDeliveryById(data.delivery_id, data.location);
            socket.broadcast.emit(WebSocketEvents.DELIVERY_UPDATED, response);
        });

        socket.on(WebSocketEvents.STATUS_CHANGED, async (data: { delivery_id: string, status: DeliveryStatus }) => {
            const response: any = await deliveryService.updateDeliveryStatus(data.delivery_id, data.status);

            socket.broadcast.emit(WebSocketEvents.DELIVERY_UPDATED, response);
        });
    });

};