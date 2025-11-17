/**
 * Safe formula evaluator for pricing calculations
 * Supports: +, -, *, /, (), ^ (power)
 * Variables: Single letters or words (L, G, F, Base, etc.)
 */

export function evaluateFormula(
  formula: string,
  variables: Record<string, number>
): number {
  try {
    // Replace variable names with their values
    let expression = formula;
    
    // Sort variables by length (longest first) to avoid partial replacements
    const sortedVars = Object.keys(variables).sort((a, b) => b.length - a.length);
    
    for (const varName of sortedVars) {
      const value = variables[varName];
      // Replace all occurrences of the variable
      const regex = new RegExp(`\\b${varName}\\b`, 'g');
      expression = expression.replace(regex, value.toString());
    }
    
    // Replace ^ with ** for power operation
    expression = expression.replace(/\^/g, '**');
    
    // Validate expression (only allow numbers, operators, parentheses, and whitespace)
    if (!/^[\d\s+\-*/.()]+$/.test(expression)) {
      throw new Error('Invalid formula: contains unauthorized characters');
    }
    
    // Evaluate the expression using Function constructor (safer than eval)
    const result = new Function(`return ${expression}`)();
    
    if (typeof result !== 'number' || isNaN(result) || !isFinite(result)) {
      throw new Error('Formula evaluation resulted in invalid number');
    }
    
    return Math.round(result * 100) / 100; // Round to 2 decimal places
  } catch (error) {
    console.error('Formula evaluation error:', error);
    throw new Error(`Failed to evaluate formula: ${formula}`);
  }
}

/**
 * Validate a formula string
 */
export function validateFormula(formula: string, requiredVariables: string[]): boolean {
  try {
    // Check if all required variables are present in the formula
    for (const varName of requiredVariables) {
      const regex = new RegExp(`\\b${varName}\\b`);
      if (!regex.test(formula)) {
        return false;
      }
    }
    
    // Try to evaluate with test values
    const testVars: Record<string, number> = {};
    requiredVariables.forEach(v => testVars[v] = 1);
    evaluateFormula(formula, testVars);
    
    return true;
  } catch {
    return false;
  }
}

/**
 * Format formula for display
 */
export function formatFormula(formula: string): string {
  return formula
    .replace(/\*/g, '×')
    .replace(/\//g, '÷')
    .replace(/\^/g, '');
}

/**
 * Example formulas
 */
export const EXAMPLE_FORMULAS = {
  simpleVolume: '(L * G * F) * B',
  volumeWithPremium: '(L * G * F) * (B + M)',
  tieredPricing: 'L * (B + (G * 0.5))',
  exponential: 'B * (L ^ 2)',
};

