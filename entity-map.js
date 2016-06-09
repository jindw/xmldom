var EntityMap = {
  'lt': '<',
  'gt': '>',
  'amp': '&',
  'quot': '"',
  'apos': "'",

  // Math

  'forall': '\u2200', // for all
  'part': '\u2202', // part
  'exists': '\u2203', // exists
  'empty': '\u2205', // empty
  'nabla': '\u2207', // nabla
  'isin': '\u2208', // isin
  'notin': '\u2209', // notin
  'ni': '\u220B', // ni
  'prod': '\u220F', // prod
  'sum': '\u2211', // sum
  'minus': '\u2212', // minus
  'lowast': '\u2217', // lowast
  'radic': '\u221A', // square root
  'prop': '\u221D', // proportional to
  'infin': '\u221E', // infinity
  'ang': '\u2220', // angle
  'and': '\u2227', // and
  'or': '\u2228', // or
  'cap': '\u2229', // cap
  'cup': '\u222A', // cup
  'int': '\u222B', // integral
  'there4': '\u2234', // therefore
  'sim': '\u223C', // simular to
  'cong': '\u2245', // approximately equal
  'asymp': '\u2248', // almost equal
  'ne': '\u2260', // not equal
  'equiv': '\u2261', // equivalent
  'le': '\u2264', // less or equal
  'ge': '\u2265', // greater or equal
  'sub': '\u2282', // subset of
  'sup': '\u2283', // superset of
  'nsub': '\u2284', // not subset of
  'sube': '\u2286', // subset or equal
  'supe': '\u2287', // superset or equal
  'oplus': '\u2295', // circled plus
  'otimes': '\u2297', // cirled times
  'perp': '\u22A5', // perpendicular
  'sdot': '\u22C5', // dot operator

  // Greek

  'Alpha': '\u0391', // Alpha
  'Beta': '\u0392', // Beta
  'Gamma': '\u0393', // Gamma
  'Delta': '\u0394', // Delta
  'Epsilon': '\u0395', // Epsilon
  'Zeta': '\u0396', // Zeta
  'Eta': '\u0397', // Eta
  'Theta': '\u0398', // Theta
  'Iota': '\u0399', // Iota
  'Kappa': '\u039A', // Kappa
  'Lambda': '\u039B', // Lambda
  'Mu': '\u039C', // Mu
  'Nu': '\u039D', // Nu
  'Xi': '\u039E', // Xi
  'Omicron': '\u039F', // Omicron
  'Pi': '\u03A0', // Pi
  'Rho': '\u03A1', // Rho
  'Sigma': '\u03A3', // Sigma
  'Tau': '\u03A4', // Tau
  'Upsilon': '\u03A5', // Upsilon
  'Phi': '\u03A6', // Phi
  'Chi': '\u03A7', // Chi
  'Psi': '\u03A8', // Psi
  'Omega': '\u03A9', // Omega

  'alpha': '\u03B1', // alpha
  'beta': '\u03B2', // beta
  'gamma': '\u03B3', // gamma
  'delta': '\u03B4', // delta
  'epsilon': '\u03B5', // epsilon
  'zeta': '\u03B6', // zeta
  'eta': '\u03B7', // eta
  'theta': '\u03B8', // theta
  'iota': '\u03B9', // iota
  'kappa': '\u03BA', // kappa
  'lambda': '\u03BB', // lambda
  'mu': '\u03BC', // mu
  'nu': '\u03BD', // nu
  'xi': '\u03BE', // xi
  'omicron': '\u03BF', // omicron
  'pi': '\u03C0', // pi
  'rho': '\u03C1', // rho
  'sigmaf': '\u03C2', // sigmaf
  'sigma': '\u03C3', // sigma
  'tau': '\u03C4', // tau
  'upsilon': '\u03C5', // upsilon
  'phi': '\u03C6', // phi
  'chi': '\u03C7', // chi
  'psi': '\u03C8', // psi
  'omega': '\u03C9', // omega
  'thetasym': '\u03D1', // theta symbol
  'upsih': '\u03D2', // upsilon symbol
  'piv': '\u03D6', // pi symbol

  // Others

  'OElig': '\u0152', // capital ligature OE
  'oelig': '\u0153', // small ligature oe
  'Scaron': '\u0160', // capital S with caron
  'scaron': '\u0161', // small S with caron
  'Yuml': '\u0178', // capital Y with diaeres
  'fnof': '\u0192', // f with hook
  'circ': '\u02C6', // modifier letter circumflex accent
  'tilde': '\u02DC', // small tilde
  'ensp': '\u2002', // en space
  'emsp': '\u2003', // em space
  'thinsp': '\u2009', // thin space
  'zwnj': '\u200C', // zero width non-joiner
  'zwj': '\u200D', // zero width joiner
  'lrm': '\u200E', // left-to-right mark
  'rlm': '\u200F', // right-to-left mark
  'ndash': '\u2013', // en dash
  'mdash': '\u2014', // em dash
  'lsquo': '\u2018', // left single quotation mark
  'rsquo': '\u2019', // right single quotation mark
  'sbquo': '\u201A', // single low-9 quotation mark
  'ldquo': '\u201C', // left double quotation mark
  'rdquo': '\u201D', // right double quotation mark
  'bdquo': '\u201E', // double low-9 quotation mark
  'dagger': '\u2020', // dagger
  'Dagger': '\u2021', // double dagger
  'bull': '\u2022', // bullet
  'hellip': '\u2026', // horizontal ellipsis
  'permil': '\u2030', // per mille 
  'prime': '\u2032', // minutes
  'Prime': '\u2033', // seconds
  'lsaquo': '\u2039', // single left angle quotation
  'rsaquo': '\u203A', // single right angle quotation
  'oline': '\u203E', // overline
  'euro': '\u20AC', // euro
  'trade': '\u2122', // trademark
  'larr': '\u2190', // left arrow
  'uarr': '\u2191', // up arrow
  'rarr': '\u2192', // right arrow
  'darr': '\u2193', // down arrow
  'harr': '\u2194', // left right arrow
  'crarr': '\u21B5', // carriage return arrow
  'lceil': '\u2308', // left ceiling
  'rceil': '\u2309', // right ceiling
  'lfloor': '\u230A', // left floor
  'rfloor': '\u230B', // right floor
  'loz': '\u25CA', // lozenge
  'spades': '\u2660', // spade
  'clubs': '\u2663', // club
  'hearts': '\u2665', // heart
  'diams': '\u2666', // diamond
}

if(typeof require == 'function'){
	exports.EntityMap = EntityMap;
}
