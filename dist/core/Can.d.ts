import { AmDuong } from "./AmDuong";
export declare class Can {
    static readonly Giáp: Can;
    static readonly Ất: Can;
    static readonly Bính: Can;
    static readonly Đinh: Can;
    static readonly Mậu: Can;
    static readonly Kỷ: Can;
    static readonly Canh: Can;
    static readonly Tân: Can;
    static readonly Nhâm: Can;
    static readonly Quý: Can;
    static readonly list: Can[];
    private _value;
    private _name;
    private _napAm;
    private _amDuong;
    private constructor();
    static byValue(value: number): Can;
    get value(): number;
    set value(value: number);
    get name(): string;
    set name(value: string);
    get napAm(): number;
    set napAm(value: number);
    get amDuong(): AmDuong;
    set amDuong(value: AmDuong);
}
