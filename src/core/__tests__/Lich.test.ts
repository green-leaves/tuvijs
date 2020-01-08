import {Chi} from "../Chi";
import {Can} from "../Can";
import * as moment from "moment";
import {AmLich, HoaGiap} from "../Lich";

test('Lấy Can Chi Âm Lịch', () => {
    let amLich = new AmLich(moment('1989-10-13 11:45:00'));
    expect(amLich.nam.hoaGiap).toStrictEqual(new HoaGiap(Can.Kỷ, Chi.Tị));
    expect(amLich.thang.hoaGiap).toStrictEqual(new HoaGiap(Can.Giáp, Chi.Tuất));
    expect(amLich.ngay.hoaGiap).toStrictEqual(new HoaGiap(Can.Bính, Chi.Ngọ));
    expect(amLich.gio.hoaGiap).toStrictEqual(new HoaGiap(Can.Giáp, Chi.Ngọ));

    amLich = new AmLich(moment('1891-07-11 05:30:00'));
    expect(amLich.nam.hoaGiap).toStrictEqual(new HoaGiap(Can.Tân, Chi.Mão));
    expect(amLich.thang.hoaGiap).toStrictEqual(new HoaGiap(Can.Ất, Chi.Mùi));
    expect(amLich.ngay.hoaGiap).toStrictEqual(new HoaGiap(Can.Mậu, Chi.Tuất));
    expect(amLich.gio.hoaGiap).toStrictEqual(new HoaGiap(Can.Ất, Chi.Mão));

    amLich = new AmLich(moment('1988-08-21 14:30:00'));
    expect(amLich.nam.hoaGiap).toStrictEqual(new HoaGiap(Can.Mậu, Chi.Thìn));
    expect(amLich.thang.hoaGiap).toStrictEqual(new HoaGiap(Can.Canh, Chi.Thân));
    expect(amLich.ngay.hoaGiap).toStrictEqual(new HoaGiap(Can.Mậu, Chi.Thân));
    expect(amLich.gio.hoaGiap).toStrictEqual(new HoaGiap(Can.Kỷ, Chi.Mùi));
});

test('Lấy Can Chi Âm Lịch 23 giờ => +1 ngày', () => {
    let amLich = new AmLich(moment('1995-11-11 23:45:00'));
    expect(amLich.nam.hoaGiap).toStrictEqual(new HoaGiap(Can.Ất, Chi.Hợi));
    expect(amLich.thang.hoaGiap).toStrictEqual(new HoaGiap(Can.Bính, Chi.Tuất));
    expect(amLich.ngay.hoaGiap).toStrictEqual(new HoaGiap(Can.Bính, Chi.Ngọ));
    expect(amLich.gio.hoaGiap).toStrictEqual(new HoaGiap(Can.Canh, Chi.Tý));

    expect(amLich.ngay.val).toBe(20);
});

test('So sánh Hoa Giáp', () => {
   HoaGiap.Kỷ_Tị.equals(new HoaGiap(Can.Kỷ, Chi.Tị));
});