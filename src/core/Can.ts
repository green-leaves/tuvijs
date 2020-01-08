import {AmDuong} from "./AmDuong";

export class Can {
    public static readonly Giáp =   new Can(1,  "Giáp", 1, AmDuong.Dương);
    public static readonly Ất   =   new Can(2,  "Ất",   1, AmDuong.Âm);
    public static readonly Bính =   new Can(3,  "Bính", 2, AmDuong.Dương);
    public static readonly Đinh =   new Can(4,  "Đinh", 2, AmDuong.Âm);
    public static readonly Mậu  =   new Can(5,  "Mậu",  3, AmDuong.Dương);
    public static readonly Kỷ   =   new Can(6,  "Kỷ",   3, AmDuong.Âm);
    public static readonly Canh =   new Can(7,  "Canh", 4, AmDuong.Dương);
    public static readonly Tân  =   new Can(8,  "Tân",  4, AmDuong.Âm);
    public static readonly Nhâm =   new Can(9,  "Nhâm", 5, AmDuong.Dương);
    public static readonly Quý  =   new Can(10, "Quý",  5, AmDuong.Âm);

    public static readonly list: Can[] = [
        Can.Giáp, Can.Ất, Can.Bính, Can.Đinh, Can.Mậu, Can.Kỷ, Can.Canh, Can.Tân, Can.Nhâm, Can.Quý
    ];
    
    private _value : number;
    private _name: string;
    private _napAm: number;
    private _amDuong: AmDuong;

    private constructor(value: number, name: string, napAm: number, amDuong: AmDuong) {
        this._value = value;
        this._name = name;
        this._napAm = napAm;
        this._amDuong = amDuong;
    }

    public static byValue(value: number) : Can {
        return Can.list[value - 1];
    }

    get value(): number {
        return this._value;
    }

    set value(value: number) {
        this._value = value;
    }

    get name(): string {
        return this._name;
    }

    set name(value: string) {
        this._name = value;
    }

    get napAm(): number {
        return this._napAm;
    }

    set napAm(value: number) {
        this._napAm = value;
    }

    get amDuong(): AmDuong {
        return this._amDuong;
    }

    set amDuong(value: AmDuong) {
        this._amDuong = value;
    }
}





