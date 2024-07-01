import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class MailRecord extends Document {
    @Prop({ type: Types.ObjectId })
    id: Types.ObjectId;
    
    @Prop({
        maxlength: 50, 
        required: true,
        match: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,6}$/,
    })
    email: string;
    
    @Prop({maxlength: 6, minlength: 6, required: true})
    plate: string;
    
    @Prop({required: true})
    message: string;
    
    @Prop({required: true, maxlength: 50})
    parkingName: string;
    
    @Prop({ default: () => new Date() })
    registrationDate: Date;
}

export const MailRecordSchema = SchemaFactory.createForClass(MailRecord);