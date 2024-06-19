export const categoryOptions = [
  { key: 'Boligkostnader', text: 'Boligkostnader', value: 'Boligkostnader' },
  { key: 'Mat og dagligvarer', text: 'Mat og dagligvarer', value: 'Mat og dagligvarer' },
  { key: 'Transport', text: 'Transport', value: 'Transport' },
  { key: 'Helse', text: 'Helse', value: 'Helse' },
  { key: 'Personlig utgifter', text: 'Personlig utgifter', value: 'Personlig utgifter' },
  { key: 'Underholdning', text: 'Underholdning', value: 'Underholdning' },
  { key: 'Kommunale avgifter', text: 'Kommunale avgifter', value: 'Kommunale avgifter' },
  { key: 'Utdanning', text: 'Utdanning', value: 'Utdanning' },
  { key: 'Diverse', text: 'Diverse', value: 'Diverse' },
  { key: 'Barneutgifter', text: 'Barneutgifter', value: 'Barneutgifter' },
  { key: 'Sparing og investering', text: 'Sparing og investering', value: 'Sparing og investering' },
];

export const categorySubcategoryMap: { [key: string]: any[] } = {
  'Boligkostnader': [
      { key: 'Generell', text: 'Generell', value: 'Generell' },
      { key: 'Husleie', text: 'Husleie', value: 'Husleie' },
      { key: 'Boliglån', text: 'Boliglån', value: 'Boliglån' },
      { key: 'Strømregning', text: 'Strømregning', value: 'Strømregning' },
      { key: 'Internett', text: 'Internett', value: 'Internett' },
      { key: 'Vann- og avløpsavgift', text: 'Vann- og avløpsavgift', value: 'Vann- og avløpsavgift' },
      { key: 'Forsikringer (hjem, innbo osv)', text: 'Forsikringer (hjem, innbo osv)', value: 'Forsikringer (hjem, innbo osv)' },
  ],
  'Mat og dagligvarer': [
      { key: 'Generell', text: 'Generell', value: 'Generell' },
      { key: 'Matvarer', text: 'Matvarer', value: 'Matvarer' },
      { key: 'Toalettsaker', text: 'Toalettsaker', value: 'Toalettsaker' },
      { key: 'Husholdningsartikler', text: 'Husholdningsartikler', value: 'Husholdningsartikler' },
  ],
  'Transport': [
      { key: 'Generell', text: 'Generell', value: 'Generell' },
      { key: 'Bensin/Diesel', text: 'Bensin/Diesel', value: 'Bensin/Diesel' },
      { key: 'Bilforsikring', text: 'Bilforsikring', value: 'Bilforsikring' },
      { key: 'Billån', text: 'Billån', value: 'Billån' },
      { key: 'Vedlikehold/reparasjon', text: 'Vedlikehold/reparasjon', value: 'Vedlikehold/reparasjon' },
      { key: 'Offentlig transportbillett', text: 'Offentlig transportbillett', value: 'Offentlig transportbillett' },
      { key: 'Strøm El-bil', text: 'Strøm El-bil', value: 'Strøm El-bil' },
      { key: 'Bompenger', text: 'Bompenger', value: 'Bompenger' },
  ],
  'Helse': [
      { key: 'Generell', text: 'Generell', value: 'Generell' },
      { key: 'Legetime/tannlege', text: 'Legetime- eller tannlegebesøk', value: 'Legetime- eller tannlegebesøk' },
      { key: 'Medisiner og reseptbelagte kostnader', text: 'Medisiner og reseptbelagte kostnader', value: 'Medisiner og reseptbelagte kostnader' },
      { key: 'Briller og linser', text: 'Briller og linser', value: 'Briller og linser' },
      { key: 'Helseforsikring', text: 'Helseforsikring', value: 'Helseforsikring' },
  ],
  'Personlig utgifter': [
      { key: 'Generell', text: 'Generell', value: 'Generell' },
      { key: 'Treningssenter', text: 'Treningssenter', value: 'Treningssenter' },
      { key: 'Klær og sko', text: 'Klær og sko', value: 'Klær og sko' },
      { key: 'Frisør- eller skjønnhetsbehandlinger', text: 'Frisør- eller skjønnhetsbehandlinger', value: 'Frisør- eller skjønnhetsbehandlinger' },
      { key: 'Gaver', text: 'Gaver', value: 'Gaver' },
  ],
  'Underholdning': [
      { key: 'Generell', text: 'Generell', value: 'Generell' },
      { key: 'Kino- eller teaterbilletter', text: 'Kino- eller teaterbilletter', value: 'Kino- eller teaterbilletter' },
      { key: 'Restauranter og kafeer', text: 'Restauranter og kafeer', value: 'Restauranter og kafeer' },
  ],
  'Kommunale avgifter': [
      { key: 'Generell', text: 'Generell', value: 'Generell' },
      { key: 'Renovasjonsavgift', text: 'Renovasjonsavgift', value: 'Renovasjonsavgift' },
      { key: 'Eiendomsskatt', text: 'Eiendomsskatt', value: 'Eiendomsskatt' },
  ],
  'Utdanning': [
      { key: 'Generell', text: 'Generell', value: 'Generell' },
      { key: 'Studielån', text: 'Studielån', value: 'Studielån' },
      { key: 'Kurs- eller opplæringsavgifter', text: 'Kurs- eller opplæringsavgifter', value: 'Kurs- eller opplæringsavgifter' },
  ],
  'Sparing og investering': [
      { key: 'Generell', text: 'Generell', value: 'Generell' },
      { key: 'Pensjonssparing', text: 'Pensjonssparing', value: 'Pensjonssparing' },
      { key: 'Aksjer, fond eller andre investeringer', text: 'Aksjer, fond eller andre investeringer', value: 'Aksjer, fond eller andre investeringer' },
      { key: 'Nødsparing eller langsiktig sparing', text: 'Nødsparing eller langsiktig sparing', value: 'Nødsparing eller langsiktig sparing' },
      { key: 'Buffer', text: 'Buffer', value: 'Buffer' },
  ],
  'Barneutgifter': [
      { key: 'Generell', text: 'Generell', value: 'Generell' },
      { key: 'Barnebidrag', text: 'Barnebidrag', value: 'Barnebidrag' },
      { key: 'Barnehage', text: 'Barnehage', value: 'Barnehage' },
      { key: 'SFO', text: 'SFO', value: 'SFO' },
      { key: 'Aktivitet', text: 'Aktivitet', value: 'Aktivitet' },
  ],
  'Diverse': [
      { key: 'Generell', text: 'Generell', value: 'Generell' },
      { key: 'Mobilregning', text: 'Mobilregning', value: 'Mobilregning' },
      { key: 'Streaming', text: 'Streaming', value: 'Streaming' },
      { key: 'Internett', text: 'Internett', value: 'Internett' },
      { key: 'Forbrukslån', text: 'Forbrukslån', value: 'Forbrukslån' },
      { key: 'Reisekostnader og ferieplanlegging', text: 'Reisekostnader og ferieplanlegging', value: 'Reisekostnader og ferieplanlegging' },
  ],
};

export const updateSubcategoryOptions = (category: string) => {
  return categorySubcategoryMap[category] || [];
};
