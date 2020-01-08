import {Can} from '../Can';

test('Tên của Can', () => {
    expect(Can.Giáp.name).toBe("Giáp");
    expect(Can.Ất  .name).toBe("Ất", );
    expect(Can.Bính.name).toBe("Bính");
    expect(Can.Đinh.name).toBe("Đinh");
    expect(Can.Mậu .name).toBe("Mậu");
    expect(Can.Kỷ  .name).toBe("Kỷ");
    expect(Can.Canh.name).toBe("Canh");
    expect(Can.Tân .name).toBe("Tân");
    expect(Can.Nhâm.name).toBe("Nhâm");
    expect(Can.Quý .name).toBe("Quý");
});

test('Lấy Can theo giá trị', () => {
    expect(Can.byValue(1)).toBe(Can.Giáp);
    expect(Can.byValue(2)).toBe(Can.Ất);
    expect(Can.byValue(3)).toBe(Can.Bính);
    expect(Can.byValue(4)).toBe(Can.Đinh);
    expect(Can.byValue(5)).toBe(Can.Mậu);
    expect(Can.byValue(6)).toBe(Can.Kỷ);
    expect(Can.byValue(7)).toBe(Can.Canh);
    expect(Can.byValue(8)).toBe(Can.Tân);
    expect(Can.byValue(9)).toBe(Can.Nhâm);
    expect(Can.byValue(10)).toBe(Can.Quý);
});
