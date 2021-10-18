import { GeneratorOutputImpl } from "./GeneratorOutputImpl";

test("writes output", () => {
    const output = new GeneratorOutputImpl();
    output.addContent("Content");
    output.addContent("Content 2");
    output.addHeader("Header");
    output.addHeader("Header 2");

    expect(output.toString()).toEqual(`Header
Header 2

Content

Content 2`);
});