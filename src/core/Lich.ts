import {Can} from "./Can";
import {Chi} from "./Chi";
import {Moment} from "moment";
import 'moment-lunar';
import {AmDuong} from "./AmDuong";

export class AmLich {
    private _julianDay: number;
    private _dateTime: Moment;
    private _nam: HoaGiapVal;
    private _thang: HoaGiapVal;
    private _ngay: HoaGiapVal;
    private _gio: HoaGiapVal;

    constructor(dateTime: Moment, lich = AmDuong.Dương) {
        let _duongLich: Moment;
        if (lich === AmDuong.Dương) {
            _duongLich = dateTime.clone();
            this._dateTime = dateTime.lunar();
        } else {
            this._dateTime = dateTime.clone();
            _duongLich = dateTime.solar();
        }

        if (this._dateTime.hour() >= 23) {
            this._dateTime = this._dateTime.add(1, 'days');
        }
        this._julianDay = findJuliusDay(_duongLich.year(), _duongLich.month() + 1, _duongLich.date());

        this.xacDinhCanChiNam();
        this.xacDinhCanChiThang();
        this.xacDinhCanChiNgay();
        this.xacDinhCanChiGio();
    }

    private xacDinhCanChiNam() {
        let nam = this._dateTime.year();
        let can = Can.list[(nam + 6) % 10];
        let chi = Chi.list[(nam + 6) % 12];
        this._nam = new HoaGiapVal(can, chi, this.dateTime.year());
    }

    private xacDinhCanChiThang() {
        let nam = this._dateTime.year();
        let thang = this._dateTime.month();
        let canThangGieng = AmLich.xacDinhCanThangGieng(nam);
        let can = Can.list[(canThangGieng.value - 1 + thang) % 10];
        let chi = Chi.list[thang];
        this._thang = new HoaGiapVal(can, chi, this.dateTime.month() + 1);
    }

    private xacDinhCanChiNgay() {
        let can = Can.byValue((this._julianDay) % 10);
        let chi = Chi.list[(this._julianDay % 12) - 1];
        this._ngay = new HoaGiapVal(can, chi, this.dateTime.date());
    }

    private xacDinhCanChiGio() {
        let canGioTy = AmLich.xacDinhCanGioTy(this._ngay.can);
        let gioIndex = Math.floor((this._dateTime.hour() + 1) / 2);
        let can = Can.byValue((canGioTy.value + gioIndex) % 10);
        let chi = Chi.byIndexFromTy(gioIndex);
        this._gio = new HoaGiapVal(can, chi, gioIndex + 1);
    }

    public static xacDinhCanGioTy(canNgay: Can) {
        switch (canNgay) {
            case Can.Giáp:
            case Can.Kỷ:
                return Can.Giáp;
            case Can.Ất:
            case Can.Canh:
                return Can.Bính;
            case Can.Bính:
            case Can.Tân:
                return Can.Mậu;
            case Can.Đinh:
            case Can.Nhâm:
                return Can.Canh;
            case Can.Mậu :
            case Can.Quý:
                return Can.Nhâm;
        }
    }

    public static xacDinhCanThangGieng(nam: number): Can {
        let lastDigitOfYear = nam % 10;
        switch (lastDigitOfYear) {
            case 1:
            case 6:
                return Can.Canh;
            case 2:
            case 7:
                return Can.Nhâm;
            case 3:
            case 8:
                return Can.Giáp;
            case 4:
            case 9:
                return Can.Bính;
            case 5:
            case 0:
                return Can.Mậu;
        }
    }

    get dateTime(): Moment {
        return this._dateTime;
    }

    set dateTime(value: Moment) {
        this._dateTime = value;
    }

    get nam(): HoaGiapVal {
        return this._nam;
    }

    set nam(value: HoaGiapVal) {
        this._nam = value;
    }

    get thang(): HoaGiapVal {
        return this._thang;
    }

    set thang(value: HoaGiapVal) {
        this._thang = value;
    }

    get ngay(): HoaGiapVal {
        return this._ngay;
    }

    set ngay(value: HoaGiapVal) {
        this._ngay = value;
    }

    get gio(): HoaGiapVal {
        return this._gio;
    }

    set gio(value: HoaGiapVal) {
        this._gio = value;
    }
}

export class HoaGiap {
    public static readonly Giáp_Tý = new HoaGiap(Can.Giáp, Chi.Tý);
    public static readonly Ất_Sửu = new HoaGiap(Can.Ất, Chi.Sửu);
    public static readonly Bính_Dần = new HoaGiap(Can.Bính, Chi.Dần);
    public static readonly Đinh_Mão = new HoaGiap(Can.Đinh, Chi.Mão);
    public static readonly Mậu_Thìn = new HoaGiap(Can.Mậu, Chi.Thìn);
    public static readonly Kỷ_Tị = new HoaGiap(Can.Kỷ, Chi.Tị);
    public static readonly Canh_Ngọ = new HoaGiap(Can.Canh, Chi.Ngọ);
    public static readonly Tân_Mùi = new HoaGiap(Can.Tân, Chi.Mùi);
    public static readonly Nhâm_Thân = new HoaGiap(Can.Nhâm, Chi.Thân);
    public static readonly Quý_Dậu = new HoaGiap(Can.Quý, Chi.Dậu);

    public static readonly Giáp_Tuất = new HoaGiap(Can.Giáp, Chi.Tuất);
    public static readonly Ất_Hợi = new HoaGiap(Can.Ất, Chi.Hợi);
    public static readonly Bính_Tý = new HoaGiap(Can.Bính, Chi.Tý);
    public static readonly Đinh_Sửu = new HoaGiap(Can.Đinh, Chi.Sửu);
    public static readonly Mậu_Dần = new HoaGiap(Can.Mậu, Chi.Dần);
    public static readonly Kỷ_Mão = new HoaGiap(Can.Kỷ, Chi.Mão);
    public static readonly Canh_Thìn = new HoaGiap(Can.Canh, Chi.Thìn);
    public static readonly Tân_Tị = new HoaGiap(Can.Tân, Chi.Tị);
    public static readonly Nhâm_Ngọ = new HoaGiap(Can.Nhâm, Chi.Ngọ);
    public static readonly Quý_Mùi = new HoaGiap(Can.Quý, Chi.Mùi);

    public static readonly Giáp_Thân = new HoaGiap(Can.Giáp, Chi.Thân);
    public static readonly Ất_Dậu = new HoaGiap(Can.Ất, Chi.Dậu);
    public static readonly Bính_Tuất = new HoaGiap(Can.Bính, Chi.Tuất);
    public static readonly Đinh_Hợi = new HoaGiap(Can.Đinh, Chi.Hợi);
    public static readonly Mậu_Tý = new HoaGiap(Can.Mậu, Chi.Tý);
    public static readonly Kỷ_Sửu = new HoaGiap(Can.Kỷ, Chi.Sửu);
    public static readonly Canh_Dần = new HoaGiap(Can.Canh, Chi.Dần);
    public static readonly Tân_Mão = new HoaGiap(Can.Tân, Chi.Mão);
    public static readonly Nhâm_Thìn = new HoaGiap(Can.Nhâm, Chi.Thìn);
    public static readonly Quý_Tị = new HoaGiap(Can.Quý, Chi.Tị);

    public static readonly Giáp_Ngọ = new HoaGiap(Can.Giáp, Chi.Ngọ);
    public static readonly Ất_Mùi = new HoaGiap(Can.Ất, Chi.Mùi);
    public static readonly Bính_Thân = new HoaGiap(Can.Bính, Chi.Thân);
    public static readonly Đinh_Dậu = new HoaGiap(Can.Đinh, Chi.Dậu);
    public static readonly Mậu_Tuất = new HoaGiap(Can.Mậu, Chi.Tuất);
    public static readonly Kỷ_Hợi = new HoaGiap(Can.Kỷ, Chi.Hợi);
    public static readonly Canh_Tý = new HoaGiap(Can.Canh, Chi.Tý);
    public static readonly Tân_Sửu = new HoaGiap(Can.Tân, Chi.Sửu);
    public static readonly Nhâm_Dần = new HoaGiap(Can.Nhâm, Chi.Dần);
    public static readonly Quý_Mão = new HoaGiap(Can.Quý, Chi.Mão);

    public static readonly Giáp_Thìn = new HoaGiap(Can.Giáp, Chi.Thìn);
    public static readonly Ất_Tị = new HoaGiap(Can.Ất, Chi.Tị);
    public static readonly Bính_Ngọ = new HoaGiap(Can.Bính, Chi.Ngọ);
    public static readonly Đinh_Mùi = new HoaGiap(Can.Đinh, Chi.Mùi);
    public static readonly Mậu_Thân = new HoaGiap(Can.Mậu, Chi.Thân);
    public static readonly Kỷ_Dậu = new HoaGiap(Can.Kỷ, Chi.Dậu);
    public static readonly Canh_Tuất = new HoaGiap(Can.Canh, Chi.Tuất);
    public static readonly Tân_Hợi = new HoaGiap(Can.Tân, Chi.Hợi);
    public static readonly Nhâm_Tý = new HoaGiap(Can.Nhâm, Chi.Tý);
    public static readonly Quý_Sửu = new HoaGiap(Can.Quý, Chi.Sửu);

    public static readonly Giáp_Dần = new HoaGiap(Can.Giáp, Chi.Dần);
    public static readonly Ất_Mão = new HoaGiap(Can.Ất, Chi.Mão);
    public static readonly Bính_Thìn = new HoaGiap(Can.Bính, Chi.Thìn);
    public static readonly Đinh_Tị = new HoaGiap(Can.Đinh, Chi.Tị);
    public static readonly Mậu_Ngọ = new HoaGiap(Can.Mậu, Chi.Ngọ);
    public static readonly Kỷ_Mùi = new HoaGiap(Can.Kỷ, Chi.Mùi);
    public static readonly Canh_Thân = new HoaGiap(Can.Canh, Chi.Thân);
    public static readonly Tân_Dậu = new HoaGiap(Can.Tân, Chi.Dậu);
    public static readonly Nhâm_Tuất = new HoaGiap(Can.Nhâm, Chi.Tuất);
    public static readonly Quý_Hợi = new HoaGiap(Can.Quý, Chi.Hợi);


    public static readonly Tuần_Giáp_Tý: HoaGiap[] = [
        HoaGiap.Giáp_Tý
        ,HoaGiap.Ất_Sửu
        ,HoaGiap.Bính_Dần
        ,HoaGiap.Đinh_Mão
        ,HoaGiap.Mậu_Thìn
        ,HoaGiap.Kỷ_Tị
        ,HoaGiap.Canh_Ngọ
        ,HoaGiap.Tân_Mùi
        ,HoaGiap.Nhâm_Thân
        ,HoaGiap.Quý_Dậu
    ];

    public static readonly Tuần_Giáp_Tuất: HoaGiap[] = [
        HoaGiap.Giáp_Tuất
        ,HoaGiap.Ất_Hợi
        ,HoaGiap.Bính_Tý
        ,HoaGiap.Đinh_Sửu
        ,HoaGiap.Mậu_Dần
        ,HoaGiap.Kỷ_Mão
        ,HoaGiap.Canh_Thìn
        ,HoaGiap.Tân_Tị
        ,HoaGiap.Nhâm_Ngọ
        ,HoaGiap.Quý_Mùi
    ];

    public static readonly Tuần_Giáp_Thân: HoaGiap[] = [
        HoaGiap.Giáp_Thân
        ,HoaGiap.Ất_Dậu
        ,HoaGiap.Bính_Tuất
        ,HoaGiap.Đinh_Hợi
        ,HoaGiap.Mậu_Tý
        ,HoaGiap.Kỷ_Sửu
        ,HoaGiap.Canh_Dần
        ,HoaGiap.Tân_Mão
        ,HoaGiap.Nhâm_Thìn
        ,HoaGiap.Quý_Tị
    ];

    public static readonly Tuần_Giáp_Ngọ: HoaGiap[] = [
        HoaGiap.Giáp_Ngọ
        ,HoaGiap.Ất_Mùi
        ,HoaGiap.Bính_Thân
        ,HoaGiap.Đinh_Dậu
        ,HoaGiap.Mậu_Tuất
        ,HoaGiap.Kỷ_Hợi
        ,HoaGiap.Canh_Tý
        ,HoaGiap.Tân_Sửu
        ,HoaGiap.Nhâm_Dần
        ,HoaGiap.Quý_Mão
    ];

    public static readonly Tuần_Giáp_Thìn: HoaGiap[] = [
        HoaGiap.Giáp_Thìn
        ,HoaGiap.Ất_Tị
        ,HoaGiap.Bính_Ngọ
        ,HoaGiap.Đinh_Mùi
        ,HoaGiap.Mậu_Thân
        ,HoaGiap.Kỷ_Dậu
        ,HoaGiap.Canh_Tuất
        ,HoaGiap.Tân_Hợi
        ,HoaGiap.Nhâm_Tý
        ,HoaGiap.Quý_Sửu
    ];

    public static readonly Tuần_Giáp_Dần: HoaGiap[] = [
        HoaGiap.Giáp_Dần
        ,HoaGiap.Ất_Mão
        ,HoaGiap.Bính_Thìn
        ,HoaGiap.Đinh_Tị
        ,HoaGiap.Mậu_Ngọ
        ,HoaGiap.Kỷ_Mùi
        ,HoaGiap.Canh_Thân
        ,HoaGiap.Tân_Dậu
        ,HoaGiap.Nhâm_Tuất
        ,HoaGiap.Quý_Hợi
    ];

    private _can: Can;
    private _chi: Chi;

    constructor(can: Can, chi: Chi) {
        this._can = can;
        this._chi = chi;
    }

    public equals(hoaGiap: HoaGiap): boolean {
        return this.can === hoaGiap.can && this.chi === hoaGiap.chi;
    }

    get can(): Can {
        return this._can;
    }

    set can(value: Can) {
        this._can = value;
    }

    get chi(): Chi {
        return this._chi;
    }

    set chi(value: Chi) {
        this._chi = value;
    }
}

class HoaGiapVal {
    private _hoaGiap: HoaGiap;
    private _val: number;

    constructor(can: Can, chi: Chi, val: number) {
        this.hoaGiap = new HoaGiap(can, chi);
        this._val = val;
    }

    get val(): number {
        return this._val;
    }

    set val(value: number) {
        this._val = value;
    }

    set hoaGiap(value: HoaGiap) {
        this._hoaGiap = value;
    }

    get hoaGiap() {
        return this._hoaGiap
    }

    get can(): Can {
        return this.hoaGiap.can;
    }

    set can(value: Can) {
        this.hoaGiap.can = value;
    }

    get chi(): Chi {
        return this.hoaGiap.chi;
    }

    set chi(value: Chi) {
        this.hoaGiap.chi = value;
    }

}

export function findJuliusDay(year: number, month: number, day: number): number {
    let a = Math.floor((14 - month) / 12);
    let y = year + 4800 - a;
    let m = month + 12 * a - 3;
    let juliusDay = day
        + Math.floor((153 * m + 2) / 5)
        + 365 * y + Math.floor(y / 4) - Math.floor(y / 100)
        + Math.floor(y / 400) - 32045;
    if (juliusDay < 2299161) {
        juliusDay = day + Math.floor((153 * m + 2) / 5) + 365 * y + Math.floor(y / 4) - 32083;
    }

    return juliusDay;
}