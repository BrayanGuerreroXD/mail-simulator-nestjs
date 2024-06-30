import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class MailRecord extends Document {
    @Prop({ type: Types.ObjectId })
    id: Types.ObjectId;
    
    @Prop()
    email: string;
    
    @Prop()
    plate: string;
    
    @Prop()
    message: string;
    
    @Prop()
    parkingName: string;
    
    @Prop({ default: () => new Date() })
    registrationDate: Date;
}

export const MailRecordSchema = SchemaFactory.createForClass(MailRecord);