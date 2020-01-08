import {Chi} from "../Chi";

test('Lấy theo index từ tý', () => {
    expect(Chi.byIndexFromTy(0)).toBe(Chi.Tý);
    expect(Chi.byIndexFromTy(1)).toBe(Chi.Sửu);
    expect(Chi.byIndexFromTy(2)).toBe(Chi.Dần);
    expect(Chi.byIndexFromTy(3)).toBe(Chi.Mão);
    expect(Chi.byIndexFromTy(4)).toBe(Chi.Thìn);
    expect(Chi.byIndexFromTy(5)).toBe(Chi.Tị);
    expect(Chi.byIndexFromTy(6)).toBe(Chi.Ngọ);
    expect(Chi.byIndexFromTy(7)).toBe(Chi.Mùi);
    expect(Chi.byIndexFromTy(8)).toBe(Chi.Thân);
    expect(Chi.byIndexFromTy(9)).toBe(Chi.Dậu);
    expect(Chi.byIndexFromTy(10)).toBe(Chi.Tuất);
    expect(Chi.byIndexFromTy(11)).toBe(Chi.Hợi);
});


test('Từ chi đếm tiến', () => {
    expect(Chi.Dần.tien(13)).toBe(Chi.Mão);
    expect(Chi.Tý.tien(4)).toBe(Chi.Thìn);
});

test('Từ chi đếm lùi', () => {
    expect(Chi.Dần.lui(1)).toBe(Chi.Sửu);
    expect(Chi.Tý.lui(4)).toBe(Chi.Thân);
    expect(Chi.Tuất.lui(21)).toBe(Chi.Sửu);
});
