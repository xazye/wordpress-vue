import type { WPMenuItem } from "./useWordPressApi";

async function fetchFromMenuAPI () {
  const menu:VueNavLink[] =[];
  let reg = /(?::\d+)(\/.*)/;
  try {
    const data = await fetch('/menu');
    console.log(data)
    let menuLinks = await data.json();
    menuLinks.forEach((menuLink:WPMenuItem) => {
      const match = menuLink.url.match(reg)
      // will have to figure out the children 
      // other day tho
      menu.push({ 
        'id': menuLink.ID,
        'menuOrder':menuLink.menu_order,
        'title':menuLink.title,
        'typeLabel':menuLink.type_label,
        'url': match ? match[1] : ''
      })
    });
    return menu;
  } catch (err) {
    console.error("Failed to fetch menu:", err);
  }
};

function adjustMenuLinkURL(url:WPMenuItem[url],typeLabel:WPMenuItem[typeLabel]): string{
  let formattedURL:string=''
  switch (typeLabel){
    case 'Page':
      formattedURL = '/page'+url
      break
    default:
      formattedURL = url
  }

  return formattedURL
}

export async function useNavigation() {
  const menu = await fetchFromMenuAPI();
  if (!menu) return []; 
  menu.sort((a, b) => a.menuOrder - b.menuOrder);
  menu.map((x)=> x.url = adjustMenuLinkURL(x.url,x.typeLabel))
  return menu;
}


export interface VueNavLink {
  id: number;
  menuOrder: number;
  title: string;
  typeLabel:string;
  url: string
}