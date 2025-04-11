async function fetchFromMenuAPI () {
  const menu:VueNavLink[] =[];
  let reg = /(?::\d+)(\/.*)/;
  try {
    const data = await fetch('/menu');
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
      console.log(menuLink.url)
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


export interface WPMenuItem {
  ID: number;
  post_author: number;
  post_date: string;
  post_date_gmt: string;
  post_content: string;
  post_title: string;
  post_excerpt: string;
  post_status: string;
  comment_status: string;
  ping_status: string;
  post_password: string;
  post_name: string;
  to_ping: string;
  pinged: string;
  post_modified: string;
  post_modified_gmt: string;
  post_content_filtered: string;
  post_parent: number;
  guid: string;
  menu_order: number;
  post_type: string;
  post_mime_type: string;
  comment_count: string;
  filter: string;
  db_id: number;
  menu_item_parent: string;
  object_id: string;
  object: string;
  type: string;
  type_label: string;
  title: string;
  url: string;
  target: string;
  attr_title: string;
  description: string;
  classes: string[];
  xfn: string;
}

export interface VueNavLink {
  id: number;
  menuOrder: number;
  title: string;
  typeLabel:string;
  url: string
}
