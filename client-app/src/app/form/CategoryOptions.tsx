export const categoryOptions = [
    { key: 'boligkostnader', text: 'Boligkostnader', value: 'boligkostnader' },
    { key: 'mat_og_dagligvarer', text: 'Mat og dagligvarer', value: 'mat_og_dagligvarer' },
    { key: 'transport', text: 'Transport', value: 'transport' },
    { key: 'helse', text: 'Helse', value: 'helse' },
    { key: 'personlig_utgifter', text: 'Personlig utgifter', value: 'personlig_utgifter' },
    { key: 'underholdning', text: 'Underholdning', value: 'underholdning' },
    { key: 'kommunale_avgifter', text: 'Kommunale avgifter', value: 'kommunale_avgifter' },
    { key: 'utdanning', text: 'Utdanning', value: 'utdanning' },
    { key: 'diverse', text: 'Diverse', value: 'diverse' },
    { key: 'sparing_og_investering', text: 'Sparing og investering', value: 'sparing_og_investering' },
  ];
  
  export const categorySubcategoryMap: { [key: string]: any[] } = {
    boligkostnader: [
        { key: 'generell', text: 'Generell', value: 'generell' },
        { key: 'husleie', text: 'Husleie', value: 'husleie' },
        { key: 'boliglån', text: 'Boliglån', value: 'boliglån' },
        { key: 'strømregning', text: 'Strømregning', value: 'strømregning' },
        { key: 'vann- og avløpsavgift', text: 'Vann- og avløpsavgift', value: 'vann- og avløpsavgift' },
        { key: 'forsikringer (hjem, innbo osv)', text: 'Forsikringer (hjem, innbo osv)', value: 'forsikringer (hjem, innbo osv)' },
      ],
      mat_og_dagligvarer: [
        { key: 'generell', text: 'Generell', value: 'generell' },
        { key: 'matvarer', text: 'Matvarer', value: 'matvarer' },
        { key: 'toalettsaker', text: 'Toalettsaker', value: 'toalettsaker' },
        { key: 'husholdningsartikler', text: 'Husholdningsartikkler', value: 'husholdningsartikler' },
      ],
      transport: [
        { key: 'generell', text: 'Generell', value: 'generell' },
        { key: 'bensin/diesel', text: 'Bensin/Diesel', value: 'bensin/diesel' },
        { key: 'bilforsikring', text: 'Bilforsikring', value: 'bilforsikring' },
        { key: 'vedlikehold/reperasjon', text: 'Vedlikehold/reperasjon', value: 'vedlikehold/reperasjon' },
        { key: 'offentlig transportbillett', text: 'Offentlig transportbillett', value: 'offentlig transportbillett' },
      ],
      helse: [
        { key: 'generell', text: 'Generell', value: 'generell' },
        { key: 'legetime/tannlege', text: 'Legetime- eller tannlegebesøk', value: 'legetime/tannlege' },
        { key: 'medisin&resept', text: 'Medisiner og reseptbelagte kostnader', value: 'medisin&resept' },
        { key: 'helseforsikring', text: 'Helseforsikring', value: 'helseforsikring' },
      ],
      personlig_utgifter: [
        { key: 'generell', text: 'Generell', value: 'generell' },
        { key: 'klær og sko', text: 'Klær og sko', value: 'klær og sko' },
        { key: 'frisør/skjønnhetsbehandlinger', text: 'Frisør- eller skjønnhetsbehandlinger', value: 'frisør/skjønnhetsbehandlinger' },
        { key: 'gaver', text: 'Gaver', value: 'gaver' },
      ],
      underholdning: [
        { key: 'generell', text: 'Generell', value: 'generell' },
        { key: 'kino/teater', text: 'Kino- eller teaterbilletter', value: 'kino/teater' },
        { key: 'restauranter', text: 'Restauranter og kafeer', value: 'restauranter' },
      ],
      kommunale_avgifter: [
        { key: 'generell', text: 'Generell', value: 'generell' },
        { key: 'renovasjonsavgift', text: 'Renovasjonsavgift', value: 'renovasjonsavgift' },
        { key: 'eiendomsskatt', text: 'Eiendomsskatt', value: 'eiendomsskatt' },
      ],
      utdanning: [
        { key: 'generell', text: 'Generell', value: 'generell' },
        { key: 'studielån', text: 'Studielån', value: 'studielån' },
        { key: 'kurs/opplæring', text: 'Kurs- eller opplæringsavgifter', value: 'kurs/opplæring' },
      ],
      sparing_og_investering: [
        { key: 'generell', text: 'Generell', value: 'generell' },
        { key: 'pensjonssparing', text: 'Pensjonssparing', value: 'pensjonssparing' },
        { key: 'aksjer/fond', text: 'Aksjer, fond eller andre investeringer', value: 'aksjer/fond' },
        { key: 'nødsparing/langsiktig sparing', text: 'Nødsparing eller langsiktig sparing', value: 'nødsparing/langsiktig sparing' },
        { key: 'buffer', text: 'Buffer', value: 'buffer' },
      ],
      diverse: [
        { key: 'generell', text: 'Generell', value: 'generell' },
        { key: 'mobil', text: 'Mobilregning', value: 'mobilregning' },
        { key: 'internett', text: 'Internettregning', value: 'internett' },
        { key: 'forbrukslån', text: 'Forbrukslån', value: 'forbrukslån' },
        { key: 'reisekostnad', text: 'Reisekostnader og ferieplanlegging', value: 'reisekostnad' },
      ]
  };
  
  export const updateSubcategoryOptions = (category: string) => {
    return categorySubcategoryMap[category] || [];
  };