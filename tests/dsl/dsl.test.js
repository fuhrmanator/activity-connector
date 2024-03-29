const DslParser = require("../../app/utils/dslParser");

/*-------DSL TESTS--------*/

describe("Test for dsl parser error", () => {
  test("Error time with exam", () => {
    expect(() => {
      DslParser.parse("E1 S2-15m");
    }).toThrow();
  });

  test("Error invalid character in front", () => {
    expect(() => {
      DslParser.parse("_E1 S2");
    }).toThrow();
  });

  test("Error no S or F with a quiz", () => {
    expect(() => {
      DslParser.parse("Q1 S1");
    }).toThrow();
  });

  test("Error no invalid character on other lines", () => {
    expect(() => {
      DslParser.parse("Q1 L1F\nq1 S2");
    }).toThrow();
  });

  test("Error no S or F with a homework", () => {
    expect(() => {
      DslParser.parse("H1 L1");
    }).toThrow();
  });

  test("Error invalid time modifier", () => {
    expect(() => {
      DslParser.parse("H1 L1S-5m@5:5");
    }).toThrow();
  });

  test("Error invalid time modifier with comment", () => {
    expect(() => {
      DslParser.parse("#test\nH1 S1F-1h@05");
    }).toThrow();
  });

  test("Error integer", () => {
    expect(() => {
      DslParser.parse("Hf");
    }).toThrow();
  });

  test("Error invalid time modifier", () => {
    expect(() => {
      DslParser.parse("H1 S1F-1w@");
    }).toThrow();
  });
});

test("Test parser basic", () => {
  expect(
    DslParser.parse(
      "E1 S2\nQ1 S1F S2S-30m\nH1 L2F L3S-1d@23:55 L3S-1d@23:55\nQ1 S1F+1h P2S-15m",
    ),
  ).toMatchSnapshot();
});

test("Test parser with a lot of stuff", () => {
  expect(
    DslParser.parse(
      "E1 S2\nQ1 S1F S2S-30m\nH1 L2F L3S-1d@23:55 L3S-1d@23:55\nQ1 S1F+1h P2S-15m\nQ1 S1F S2S-30m\nH1 L2F L3S-1d@23:55 L3S-1d@23:55\nQ1 S1F+1h P2S-15m\nQ1 S1F S2S-30m\nH1 L2F L3S-1d@23:55 L3S-1d@23:55\nQ1 S1F+1h P2S-15m\nQ1 S1F S2S-30m\nH1 L2F L3S-1d@23:55 L3S-1d@23:55\nQ1 S1F+1h P2S-15m\nQ1 S1F S2S-30m\nH1 L2F L3S-1d@23:55 L3S+1d@23:55\nQ1 S1F+1h P2S-15m\nQ1 S1F S2S-30m\nH1 L2F L3S-1d@23:55 L3S-1d@23:55\nQ1 S1F+1h P2S-15w\nQ1 S1F S2S-30m\nH1 L2F L3S-1d@23:55 L3S-1d@23:55\nQ1 S1F+1h P2S-15m\nE2 S13",
    ),
  ).toMatchSnapshot();
});
