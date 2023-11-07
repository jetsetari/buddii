export const validateEmail = (email) => {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  );
}

export const validatePassword = (password) => {
  let regularExpression = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,16}$/;
  return regularExpression.test(password);
}

export const getMainColor = (imgEl) => {
  var blockSize = 5, // only visit every 5 pixels
      defaultRGB = {r:0,g:0,b:0}, // for non-supporting envs
      canvas = document.createElement('canvas'),
      context = canvas.getContext && canvas.getContext('2d'),
      data, width, height,
      i = -4,
      length,
      rgb = {r:0,g:0,b:0},
      count = 0;
      
  if (!context) {
      return defaultRGB;
  }
  height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
  width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
  
  context.drawImage(imgEl, 0, 0);
  
  try {
      data = context.getImageData(0, 0, width, height);
  } catch(e) {
      /* security error, img on diff domain */alert('x');
      return defaultRGB;
  }
  
  length = data.data.length;
  
  while ( (i += blockSize * 4) < length ) {
      ++count;
      rgb.r += data.data[i];
      rgb.g += data.data[i+1];
      rgb.b += data.data[i+2];
  }
  
  // ~~ used to floor values
  rgb.r = ~~(rgb.r/count);
  rgb.g = ~~(rgb.g/count);
  rgb.b = ~~(rgb.b/count);
  return rgb;
}

export const getExtension = (fileName) => {
  return fileName.substr(fileName.lastIndexOf('.') + 1);
}

export const removeDuplicates = (arr) => {
    let s = new Set(arr);
    let it = s.values();
    return Array.from(it);
}

export const getContrastColor = (colors) => {
  if (colors.r*0.299 + colors.g*0.587 + colors.b*0.114 > 186) {
    return '#000000';
  } else {
    return '#FFFFFF';
  }
}

export const componentToHex = (c) => {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

export const rgbToHex = (color) => {
  return "#" + componentToHex(color.r) + componentToHex(color.g) + componentToHex(color.b);
}

export const opacityToHex = (opacity) => {
  return opacity.toString(16);
}

export const findInList = (list, key, id, _keys) => {
  let _return = false;
  if(list && typeof key === 'string' && typeof id == 'string' && typeof _keys == 'object'){
    let _filter = list.filter(item => item[key] == id);
    if(_filter) {
      let arrFiltered = _filter[0];
      _keys.forEach((value, key) => {
        if(typeof arrFiltered !== 'undefined' && (value in arrFiltered)) {
          arrFiltered = arrFiltered[value]
        } 
      })
      _return = arrFiltered;
    }
  }
  if(!_return && !list){ console.log('Not found in list') };
  return _return;
}