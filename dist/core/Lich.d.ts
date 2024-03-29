import { Can } from "./Can";
import { Chi } from "./Chi";
import { Moment } from "moment";
import 'moment-lunar';
import { AmDuong } from "./AmDuong";
export declare class AmLich {
    private _julianDay;
    private _dateTime;
    private _nam;
    private _thang;
    private _ngay;
    private _gio;
    constructor(dateTime: Moment, lich?: AmDuong);
    private xacDinhCanChiNam;
    private xacDinhCanChiThang;
    private xacDinhCanChiNgay;
    private xacDinhCanChiGio;
    static xacDinhCanGioTy(canNgay: Can): Can;
    static xacDinhCanThangGieng(nam: number): Can;
    get dateTime(): Moment;
    set dateTime(value: Moment);
    get nam(): HoaGiapVal;
    set nam(value: HoaGiapVal);
    get thang(): HoaGiapVal;
    set thang(value: HoaGiapVal);
    get ngay(): HoaGiapVal;
    set ngay(value: HoaGiapVal);
    get gio(): HoaGiapVal;
    set gio(value: HoaGiapVal);
}
export declare class HoaGiap {
    static readonly Giáp_Tý: HoaGiap;
    static readonly Ất_Sửu: HoaGiap;
    static readonly Bính_Dần: HoaGiap;
    static readonly Đinh_Mão: HoaGiap;
    static readonly Mậu_Thìn: HoaGiap;
    static readonly Kỷ_Tị: HoaGiap;
    static readonly Canh_Ngọ: HoaGiap;
    static readonly Tân_Mùi: HoaGiap;
    static readonly Nhâm_Thân: HoaGiap;
    static readonly Quý_Dậu: HoaGiap;
    static readonly Giáp_Tuất: HoaGiap;
    static readonly Ất_Hợi: HoaGiap;
    static readonly Bính_Tý: HoaGiap;
    static readonly Đinh_Sửu: HoaGiap;
    static readonly Mậu_Dần: HoaGiap;
    static readonly Kỷ_Mão: HoaGiap;
    static readonly Canh_Thìn: HoaGiap;
    static readonly Tân_Tị: HoaGiap;
    static readonly Nhâm_Ngọ: HoaGiap;
    static readonly Quý_Mùi: HoaGiap;
    static readonly Giáp_Thân: HoaGiap;
    static readonly Ất_Dậu: HoaGiap;
    static readonly Bính_Tuất: HoaGiap;
    static readonly Đinh_Hợi: HoaGiap;
    static readonly Mậu_Tý: HoaGiap;
    static readonly Kỷ_Sửu: HoaGiap;
    static readonly Canh_Dần: HoaGiap;
    static readonly Tân_Mão: HoaGiap;
    static readonly Nhâm_Thìn: HoaGiap;
    static readonly Quý_Tị: HoaGiap;
    static readonly Giáp_Ngọ: HoaGiap;
    static readonly Ất_Mùi: HoaGiap;
    static readonly Bính_Thân: HoaGiap;
    static readonly Đinh_Dậu: HoaGiap;
    static readonly Mậu_Tuất: HoaGiap;
    static readonly Kỷ_Hợi: HoaGiap;
    static readonly Canh_Tý: HoaGiap;
    static readonly Tân_Sửu: HoaGiap;
    static readonly Nhâm_Dần: HoaGiap;
    static readonly Quý_Mão: HoaGiap;
    static readonly Giáp_Thìn: HoaGiap;
    static readonly Ất_Tị: HoaGiap;
    static readonly Bính_Ngọ: HoaGiap;
    static readonly Đinh_Mùi: HoaGiap;
    static readonly Mậu_Thân: HoaGiap;
    static readonly Kỷ_Dậu: HoaGiap;
    static readonly Canh_Tuất: HoaGiap;
    static readonly Tân_Hợi: HoaGiap;
    static readonly Nhâm_Tý: HoaGiap;
    static readonly Quý_Sửu: HoaGiap;
    static readonly Giáp_Dần: HoaGiap;
    static readonly Ất_Mão: HoaGiap;
    static readonly Bính_Thìn: HoaGiap;
    static readonly Đinh_Tị: HoaGiap;
    static readonly Mậu_Ngọ: HoaGiap;
    static readonly Kỷ_Mùi: HoaGiap;
    static readonly Canh_Thân: HoaGiap;
    static readonly Tân_Dậu: HoaGiap;
    static readonly Nhâm_Tuất: HoaGiap;
    static readonly Quý_Hợi: HoaGiap;
    static readonly Tuần_Giáp_Tý: HoaGiap[];
    static readonly Tuần_Giáp_Tuất: HoaGiap[];
    static readonly Tuần_Giáp_Thân: HoaGiap[];
    static readonly Tuần_Giáp_Ngọ: HoaGiap[];
    static readonly Tuần_Giáp_Thìn: HoaGiap[];
    static readonly Tuần_Giáp_Dần: HoaGiap[];
    private _can;
    private _chi;
    constructor(can: Can, chi: Chi);
    equals(hoaGiap: HoaGiap): boolean;
    get can(): Can;
    set can(value: Can);
    get chi(): Chi;
    set chi(value: Chi);
}
declare class HoaGiapVal {
    private _hoaGiap;
    private _val;
    constructor(can: Can, chi: Chi, val: number);
    get val(): number;
    set val(value: number);
    set hoaGiap(value: HoaGiap);
    get hoaGiap(): HoaGiap;
    get can(): Can;
    set can(value: Can);
    get chi(): Chi;
    set chi(value: Chi);
}
export declare function findJuliusDay(year: number, month: number, day: number): number;
export {};
