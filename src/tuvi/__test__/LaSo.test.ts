import {CungChuc, LaSo} from "../LaSo";
import {Chi} from "../../core/Chi";
import {Can} from "../../core/Can";
import {ChinhTinh, PhuTinh} from "../TinhDau";
import {AmDuong, GioiTinh} from "../../core/AmDuong";
import moment = require("moment");



test('12 cung', () => {
    let laso = new LaSo();
    expect(laso.cungList.length).toBe(12);
    expect(laso.cungList[0].chi).toBe(Chi.Dần);
});

test('Xác định Can cho các cung', () => {
    let laso = new LaSo();
    // @ts-ignore
    laso.anThienCan(Can.Bính);
    expect(laso.getCungVi(Chi.Dần).can).toBe(Can.Bính);
    expect(laso.getCungVi(Chi.Mão).can).toBe(Can.Đinh);
    expect(laso.getCungVi(Chi.Thìn).can).toBe(Can.Mậu);
    expect(laso.getCungVi(Chi.Tị).can).toBe(Can.Kỷ);
    expect(laso.getCungVi(Chi.Ngọ).can).toBe(Can.Canh);
    expect(laso.getCungVi(Chi.Mùi).can).toBe(Can.Tân);
    expect(laso.getCungVi(Chi.Thân).can).toBe(Can.Nhâm);
    expect(laso.getCungVi(Chi.Dậu).can).toBe(Can.Quý);
    expect(laso.getCungVi(Chi.Tuất).can).toBe(Can.Giáp);
    expect(laso.getCungVi(Chi.Hợi).can).toBe(Can.Ất);
    expect(laso.getCungVi(Chi.Tý).can).toBe(Can.Bính);
    expect(laso.getCungVi(Chi.Sửu).can).toBe(Can.Đinh);

    [Can.Bính, Can.Mậu, Can.Canh, Can.Nhâm, Can.Giáp].forEach(can => {
        // @ts-ignore
        laso.anThienCan(can);
        expect(laso.getCungVi(Chi.Dần).can).toBe(can);
        expect(laso.getCungVi(Chi.Tý).can).toBe(can);
    })
});

test('Lấy Can cung Dần', () => {
    expect(LaSo.timCanCungDan(Can.Giáp)).toBe(Can.Bính);
    expect(LaSo.timCanCungDan(Can.Kỷ)).toBe(Can.Bính);

    expect(LaSo.timCanCungDan(Can.Ất)).toBe(Can.Mậu);
    expect(LaSo.timCanCungDan(Can.Canh)).toBe(Can.Mậu);

    expect(LaSo.timCanCungDan(Can.Bính)).toBe(Can.Canh);
    expect(LaSo.timCanCungDan(Can.Tân)).toBe(Can.Canh);

    expect(LaSo.timCanCungDan(Can.Đinh)).toBe(Can.Nhâm);
    expect(LaSo.timCanCungDan(Can.Nhâm)).toBe(Can.Nhâm);

    expect(LaSo.timCanCungDan(Can.Mậu)).toBe(Can.Giáp);
    expect(LaSo.timCanCungDan(Can.Quý)).toBe(Can.Giáp);

});

test('Tìm Cung Mệnh', () => {
    expect(LaSo.timCungMenh(9, 12)).toBe(Chi.Hợi);
    expect(LaSo.timCungMenh(9, 7)).toBe(Chi.Thìn);
});

test('An Cung Chức', () => {
    let laso = new LaSo();
    // @ts-ignore
    laso.anCungChuc(Chi.Thìn);
    expect(laso.getCungVi(Chi.Thìn).cungChuc).toBe(CungChuc.Mệnh);
    expect(laso.getCungVi(Chi.Thân).cungChuc).toBe(CungChuc.Quan);
    expect(laso.getCungVi(Chi.Tý).cungChuc).toBe(CungChuc.Tài);

    expect(laso.getCungVi(Chi.Tuất).cungChuc).toBe(CungChuc.Di);
    expect(laso.getCungVi(Chi.Ngọ).cungChuc).toBe(CungChuc.Phúc);
    expect(laso.getCungVi(Chi.Dần).cungChuc).toBe(CungChuc.Phối);

    expect(laso.getCungVi(Chi.Tị).cungChuc).toBe(CungChuc.Phụ);
    expect(laso.getCungVi(Chi.Dậu).cungChuc).toBe(CungChuc.Nô);
    expect(laso.getCungVi(Chi.Sửu).cungChuc).toBe(CungChuc.Tử);

    expect(laso.getCungVi(Chi.Mùi).cungChuc).toBe(CungChuc.Điền);
    expect(laso.getCungVi(Chi.Hợi).cungChuc).toBe(CungChuc.Tật);
    expect(laso.getCungVi(Chi.Mão).cungChuc).toBe(CungChuc.Huynh);
});

test('An Cô Thần Quả Tú', () => {

});

test('Khởi tạo lá số', () => {
    console.time("Khởi tạo lá số bằng lịch dương");
    let laso: LaSo = LaSo.new('1989-10-13 11:45:00');
    console.timeEnd("Khởi tạo lá số bằng lịch dương");
    expect(laso.getCungVi(Chi.Thìn).can).toBe(Can.Mậu);
    expect(laso.getCungVi(Chi.Thìn).cungChuc).toBe(CungChuc.Mệnh);
    expect(laso.getCungVi(Chi.Tý).can).toBe(Can.Bính);
    expect(laso.getCungVi(Chi.Tý).cungChuc).toBe(CungChuc.Tài);
    expect(laso.getCungVi(Chi.Tị).chinhTinh).toContain(ChinhTinh.Tử_Vi);
    expect(laso.getCungVi(Chi.Tị).chinhTinh).toContain(ChinhTinh.Thất_Sát);
    expect(laso.getCungVi(Chi.Thìn).chinhTinh).toContain(ChinhTinh.Thiên_Cơ);
    expect(laso.getCungVi(Chi.Thìn).chinhTinh).toContain(ChinhTinh.Thiên_Lương);
    expect(laso.getCungVi(Chi.Mão).chinhTinh).toContain(ChinhTinh.Thiên_Tướng);
    expect(laso.getCungVi(Chi.Dần).chinhTinh).toContain(ChinhTinh.Thái_Dương);
    expect(laso.getCungVi(Chi.Dần).chinhTinh).toContain(ChinhTinh.Cự_Môn);
    expect(laso.getCungVi(Chi.Sửu).chinhTinh).toContain(ChinhTinh.Vũ_Khúc);
    expect(laso.getCungVi(Chi.Sửu).chinhTinh).toContain(ChinhTinh.Tham_Lang);
    expect(laso.getCungVi(Chi.Tý).chinhTinh).toContain(ChinhTinh.Thiên_Đồng);
    expect(laso.getCungVi(Chi.Tý).chinhTinh).toContain(ChinhTinh.Thái_Âm);
    expect(laso.getCungVi(Chi.Hợi).chinhTinh).toContain(ChinhTinh.Thiên_Phủ);
    expect(laso.getCungVi(Chi.Dậu).chinhTinh).toContain(ChinhTinh.Liêm_Trinh);
    expect(laso.getCungVi(Chi.Dậu).chinhTinh).toContain(ChinhTinh.Phá_Quân);

    expect(laso.getCungChuc(CungChuc.Mệnh).cungThan).toBe(true);

    expect(laso.getCungVi(Chi.Thìn).phuTinh).toContain(PhuTinh.Văn_Xương);
    expect(laso.getCungVi(Chi.Tuất).phuTinh).toContain(PhuTinh.Văn_Khúc);

    expect(laso.getCungVi(Chi.Tý).phuTinh).toContain(PhuTinh.Tả_Phù);
    expect(laso.getCungVi(Chi.Dần).phuTinh).toContain(PhuTinh.Hữu_Bật);

    expect(laso.getCungVi(Chi.Tý).phuTinh).toContain(PhuTinh.Thiên_Khôi);
    expect(laso.getCungVi(Chi.Thân).phuTinh).toContain(PhuTinh.Thiên_Việt);

    expect(laso.getCungVi(Chi.Thìn).phuTinh).toContain(PhuTinh.Ân_Quang);
    expect(laso.getCungVi(Chi.Tuất).phuTinh).toContain(PhuTinh.Thiên_Quý);

    expect(laso.getCungVi(Chi.Sửu).phuTinh).toContain(PhuTinh.Tam_Thai);
    expect(laso.getCungVi(Chi.Sửu).phuTinh).toContain(PhuTinh.Bát_Tọa);
    expect(laso.getCungVi(Chi.Thìn).phuTinh).toContain(PhuTinh.Quả_Tú);
    expect(laso.getCungVi(Chi.Thân).phuTinh).toContain(PhuTinh.Cô_Thần);
    expect(laso.getCungVi(Chi.Tị).phuTinh).toContain(PhuTinh.Địa_Không);
    expect(laso.getCungVi(Chi.Tị).phuTinh).toContain(PhuTinh.Địa_Kiếp);

    expect(laso.getCungVi(Chi.Ngọ).phuTinh).toContain(PhuTinh.Lộc_Tồn);
    expect(laso.getCungVi(Chi.Thìn).phuTinh).toContain(PhuTinh.Thanh_Long);
    expect(laso.getCungVi(Chi.Dậu).phuTinh).toContain(PhuTinh.Đại_Hao);

    expect(laso.getCungVi(Chi.Tị).phuTinh).toContain(PhuTinh.Đà_La);
    expect(laso.getCungVi(Chi.Mùi).phuTinh).toContain(PhuTinh.Kình_Dương);

    expect(laso.getCungVi(Chi.Thìn).phuTinh).toContain(PhuTinh.Linh_Tinh);
    expect(laso.getCungVi(Chi.Dậu).phuTinh).toContain(PhuTinh.Hỏa_Tinh);

    expect(laso.getCungVi(Chi.Thìn).phuTinh).toContain(PhuTinh.Trực_Phù);
    expect(laso.getCungVi(Chi.Tị).phuTinh).toContain(PhuTinh.Thái_Tuế);
    expect(laso.getCungVi(Chi.Ngọ).phuTinh).toContain(PhuTinh.Thiếu_Dương);
    expect(laso.getCungVi(Chi.Mùi).phuTinh).toContain(PhuTinh.Tang_Môn);

    expect(laso.getCungVi(Chi.Ngọ).phuTinh).toContain(PhuTinh.Thiên_Không);
    expect(laso.getCungVi(Chi.Ngọ).phuTinh).toContain(PhuTinh.Đào_Hoa);
    expect(laso.getCungVi(Chi.Tuất).phuTinh).toContain(PhuTinh.Hồng_Loan);
    expect(laso.getCungVi(Chi.Thìn).phuTinh).toContain(PhuTinh.Thiên_Hỷ);

    expect(laso.getCungVi(Chi.Thìn).phuTinh).toContain(PhuTinh.Tử);
    expect(laso.getCungVi(Chi.Hợi).phuTinh).toContain(PhuTinh.Trường_Sinh);

    expect(laso.getCungVi(Chi.Tị).phuTinh).toContain(PhuTinh.Thiên_Hình);
    expect(laso.getCungVi(Chi.Hợi).phuTinh).toContain(PhuTinh.Thiên_Mã);

    expect(laso.getCungVi(Chi.Dậu).phuTinh).toContain(PhuTinh.Long_Trì);
    expect(laso.getCungVi(Chi.Tị).phuTinh).toContain(PhuTinh.Phượng_Các);

    expect(laso.getCungVi(Chi.Tị).phuTinh).toContain(PhuTinh.Giải_Thần);

    expect(laso.getCungVi(Chi.Sửu).phuTinh).toContain(PhuTinh.Thiên_Khốc);
    expect(laso.getCungVi(Chi.Hợi).phuTinh).toContain(PhuTinh.Thiên_Hư);

    expect(laso.getCungVi(Chi.Dần).phuTinh).toContain(PhuTinh.Thiên_Đức);
    expect(laso.getCungVi(Chi.Tuất).phuTinh).toContain(PhuTinh.Nguyệt_Đức);

    expect(laso.getCungVi(Chi.Dần).phuTinh).toContain(PhuTinh.Kiếp_Sát);

    expect(laso.getCungVi(Chi.Sửu).phuTinh).toContain(PhuTinh.Hoa_Cái);

    expect(laso.getCungVi(Chi.Dậu).phuTinh).toContain(PhuTinh.Phá_Toái);
    expect(laso.getCungVi(Chi.Dậu).phuTinh).toContain(PhuTinh.Thiên_Riêu);
    expect(laso.getCungVi(Chi.Dậu).phuTinh).toContain(PhuTinh.Thiên_Y);

    expect(laso.getCungVi(Chi.Thìn).phuTinh).toContain(PhuTinh.Thiên_Giải);
    expect(laso.getCungVi(Chi.Mão).phuTinh).toContain(PhuTinh.Địa_Giải);

    expect(laso.getCungVi(Chi.Dần).phuTinh).toContain(PhuTinh.Quốc_Ấn);
    expect(laso.getCungVi(Chi.Hợi).phuTinh).toContain(PhuTinh.Đường_Phù);

    expect(laso.getCungVi(Chi.Dậu).phuTinh).toContain(PhuTinh.Thiên_Quan);
    expect(laso.getCungVi(Chi.Dần).phuTinh).toContain(PhuTinh.Thiên_Phúc);

    expect(laso.getCungVi(Chi.Dậu).phuTinh).toContain(PhuTinh.Thiên_Quan);
    expect(laso.getCungVi(Chi.Dần).phuTinh).toContain(PhuTinh.Thiên_Phúc);

    expect(laso.getCungVi(Chi.Ngọ).phuTinh).toContain(PhuTinh.Lưu_Hà);
    expect(laso.getCungVi(Chi.Thân).phuTinh).toContain(PhuTinh.Thiên_Trù);

    expect(laso.getCungVi(Chi.Tuất).phuTinh).toContain(PhuTinh.Âm_Sát);

    expect(laso.getCungVi(Chi.Thân).phuTinh).toContain(PhuTinh.TRIỆT);
    expect(laso.getCungVi(Chi.Dậu).phuTinh).toContain(PhuTinh.TRIỆT);

    expect(laso.getCungVi(Chi.Tuất).phuTinh).toContain(PhuTinh.TUẦN);
    expect(laso.getCungVi(Chi.Hợi).phuTinh).toContain(PhuTinh.TUẦN);

    expect(laso.timSao(ChinhTinh.Thái_Âm).cungChuc).toBe(CungChuc.Tài);
    expect(laso.timSao(PhuTinh.Hỏa_Tinh).cungChuc).toBe(CungChuc.Nô);
    expect(laso.timSao(PhuTinh.Địa_Không).cungChuc).toBe(CungChuc.Phụ);

    expect(laso.timSao(ChinhTinh.Vũ_Khúc).phuTinh).toContain(PhuTinh.Hóa_Lộc);
    expect(laso.timSao(ChinhTinh.Tham_Lang).phuTinh).toContain(PhuTinh.Hóa_Quyền);
    expect(laso.timSao(ChinhTinh.Thiên_Lương).phuTinh).toContain(PhuTinh.Hóa_Khoa);
    expect(laso.timSao(PhuTinh.Văn_Khúc).phuTinh).toContain(PhuTinh.Hóa_Kỵ);

    let laso1: LaSo = LaSo.new('1995-11-11 23:45:00', GioiTinh.Nữ);
    expect(laso1.getCungVi(Chi.Thìn).can).toBe(Can.Canh);
    expect(laso1.getCungVi(Chi.Tuất).cungChuc).toBe(CungChuc.Mệnh);
    expect(laso1.getCungVi(Chi.Tý).can).toBe(Can.Mậu);
    expect(laso1.getCungVi(Chi.Tý).cungChuc).toBe(CungChuc.Phúc);
    expect(laso1.getCungChuc(CungChuc.Mệnh).cungThan).toBe(true);

    expect(laso1.getCungVi(Chi.Mão).phuTinh).toContain(PhuTinh.Lộc_Tồn);
    expect(laso1.getCungVi(Chi.Sửu).phuTinh).toContain(PhuTinh.Phục_Binh);
    expect(laso1.getCungVi(Chi.Ngọ).phuTinh).toContain(PhuTinh.Tiểu_Hao);

    expect(laso1.getCungVi(Chi.Dần).phuTinh).toContain(PhuTinh.Đà_La);
    expect(laso1.getCungVi(Chi.Thìn).phuTinh).toContain(PhuTinh.Kình_Dương);

    expect(laso1.getCungVi(Chi.Thìn).phuTinh).toContain(PhuTinh.Hồng_Loan);

    expect(laso1.timSao(ChinhTinh.Thiên_Cơ).phuTinh).toContain(PhuTinh.Hóa_Lộc);
    expect(laso1.timSao(ChinhTinh.Thiên_Lương).phuTinh).toContain(PhuTinh.Hóa_Quyền);
    expect(laso1.timSao(ChinhTinh.Tử_Vi).phuTinh).toContain(PhuTinh.Hóa_Khoa);
    expect(laso1.timSao(ChinhTinh.Thái_Âm).phuTinh).toContain(PhuTinh.Hóa_Kỵ);


    let laso2: LaSo = LaSo.new('1955-10-28 22:45:00', GioiTinh.Nam);
    expect(laso2.getCungVi(Chi.Ngọ).chinhTinh).toContain(ChinhTinh.Tử_Vi);
    expect(laso2.getCungVi(Chi.Thìn).chinhTinh).toContain(ChinhTinh.Thất_Sát);
    expect(laso2.getCungChuc(CungChuc.Phối).cungThan).toBe(true);

    expect(laso2.getCungVi(Chi.Thìn).phuTinh).toContain(PhuTinh.Thiên_Quý);
    expect(laso2.getCungVi(Chi.Tuất).phuTinh).toContain(PhuTinh.Ân_Quang);

    let laso3: LaSo = LaSo.new(moment('1988-08-21 14:45:00'), GioiTinh.Nữ);
    expect(laso3.getCungVi(Chi.Sửu).cungChuc).toBe(CungChuc.Mệnh);
    expect(laso3.getCungVi(Chi.Sửu).phuTinh).toContain(PhuTinh.Thiên_Khôi);
    expect(laso3.getCungVi(Chi.Mùi).phuTinh).toContain(PhuTinh.Thiên_Việt);
    expect(laso3.getCungVi(Chi.Mão).phuTinh).toContain(PhuTinh.Thiên_Quan);
    expect(laso3.getCungVi(Chi.Mão).phuTinh).toContain(PhuTinh.Thiên_Phúc);
});

test('Khởi tạo lá số bằng lịch âm', () => {
    console.time("Khởi tạo lá số bằng lịch âm");
    let laso = LaSo.new('1891-06-06 06:00', GioiTinh.Nam, AmDuong.Âm);
    console.timeEnd("Khởi tạo lá số bằng lịch âm");
    expect(laso.getCungVi(Chi.Thìn).cungChuc).toBe(CungChuc.Mệnh);
    expect(laso.getCungChuc(CungChuc.Mệnh).chinhTinh)
        .toEqual(expect.arrayContaining([ChinhTinh.Tử_Vi, ChinhTinh.Thiên_Tướng]));
});

