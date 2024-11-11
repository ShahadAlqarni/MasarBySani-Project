import { Injectable } from '@nestjs/common';

@Injectable()
export class BookingService {
    reserve(){
        return 'Booking Reserved';
    }
}
