use cochavira_core::api::*;

#[test]
fn sv_analysis_produces_semantic_tokens() {
    let source = r#"
        module adder (
            input logic a,
            input logic b,
            output logic y
        );
            assign y = a ^ b;
        endmodule
    "#;

    let result = analyze_sv(source);

    assert!(
        result.is_ok(),
        "SystemVerilog analysis must succeed"
    );

    let semantic = result.unwrap();
    let tokens = semantic.tokens();

    assert!(
        !tokens.is_empty(),
        "Semantic analysis must produce tokens"
    );

    for tok in tokens {
        assert!(
            tok.span.0 < tok.span.1,
            "Token span must be non-empty: {:?}",
            tok
        );

        assert!(
            tok.span.1 <= source.len(),
            "Token span out of bounds: {:?}",
            tok
        );
    }
}
