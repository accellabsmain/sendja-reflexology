export interface SendjaOutlet {
  id: string;
  name: string;
  tagline?: string;
  address: string;
  phone: string;
  whatsappLink: string;
  mapsLink: string;
  city: string;
}

export const OUTLETS: SendjaOutlet[] = [
  {
    id: "dago",
    name: "Sendja Dago",
    address: "Jl. Pager Gunung No. 18, Dago, Bandung",
    phone: "0818-1818-1835",
    whatsappLink: "https://wa.link/glbe1e",
    mapsLink: "https://goo.gl/maps/KtqL4b45BjH6u639A",
    city: "Bandung",
  },
  {
    id: "bengawan",
    name: "Sendja Bengawan",
    address: "Jl. Bengawan 33, Cihapit, Bandung",
    phone: "0811-2333-306",
    whatsappLink: "https://wa.link/6oog9c",
    mapsLink: "https://maps.app.goo.gl/x6eSd7hjueJxgE7o9",
    city: "Bandung",
  },
  {
    id: "panglima-polim",
    name: "Sendja Panglima Polim",
    tagline: "Female Only",
    address: "Jl. Panglima Polim 66, Jakarta Selatan",
    phone: "0812-6007-9800",
    whatsappLink: "https://wa.link/50aqgw",
    mapsLink: "https://maps.app.goo.gl/mNM2JEH1JhMSpUcr9",
    city: "Jakarta",
  },
  {
    id: "hutanika",
    name: "Sendja Hutanika",
    tagline: "Female Only",
    address: "HUTANIKA, 2nd Floor, Jl. Asia Afrika 91-97, Bandung",
    phone: "0821-9009-1997",
    whatsappLink: "https://wa.link/79fhy1",
    mapsLink: "https://maps.app.goo.gl/Y4xfMa8UB7LVh6wE8",
    city: "Bandung",
  },
  {
    id: "pasir-kaliki",
    name: "Sendja Pasir Kaliki",
    address: "Jl. Pasir Kaliki 90, Bandung",
    phone: "0851-8900-0078",
    whatsappLink: "https://wa.link/ewhtkq",
    mapsLink: "https://maps.app.goo.gl/teRh1L9UXKdkswEK7?g_st=ic",
    city: "Bandung",
  },
  {
    id: "cilandak",
    name: "Sendja Cilandak",
    address: "Jl. Intan No. 8, Jakarta Selatan",
    phone: "0851-8700-7009",
    whatsappLink: "https://wa.link/t31z40",
    mapsLink: "https://maps.app.goo.gl/6gctdmkYzsAdb2uE8",
    city: "Jakarta",
  },
];

export const SOCIAL_LINKS = {
  tiktok: "https://www.tiktok.com/@sendja.wellness",
  instagram: "https://instagram.com/sendja.reflexologywellness",
  feedbackForm: "https://forms.gle/Vu1xwoNo4MrhrP7b8",
  partnershipForm: "https://forms.gle/HxbxvLitr9QjvjWL7",
};
