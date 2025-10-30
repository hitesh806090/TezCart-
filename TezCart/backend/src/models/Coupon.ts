import mongoose, { Document, Schema } from 'mongoose';

export type CouponType = 'percentage' | 'fixed';

export interface ICoupon extends Document {
  code: string;
  type: CouponType;
  value: number;
  active: boolean;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const couponSchema = new Schema<ICoupon>(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },
    type: {
      type: String,
      enum: ['percentage', 'fixed'],
      required: true,
    },
    value: {
      type: Number,
      required: true,
      min: 0,
    },
    active: {
      type: Boolean,
      default: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<ICoupon>('Coupon', couponSchema);
