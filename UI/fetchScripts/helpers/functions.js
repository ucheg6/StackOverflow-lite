const formatTime = (time) => {
  const formatted = Date.parse(time);
  const now = new Date(formatted + 3600000);

  const difference = Math.floor((new Date() - now) / 1000);

  if (difference < 60) {
    return difference === 1
      ? `${difference} second ago` : `${difference} seconds ago`;
  }
  if (difference >= 60 && difference <= 3599) {
    const minutes = Math.floor(difference / 60);
    return minutes === 1
      ? `${minutes} minute ago` : `${minutes} minutes ago`;
  }

  if (difference >= 3600 && difference <= 86399) {
    const hours = Math.floor(difference / 3600);

    return hours === 1
      ? `${hours} hour ago` : `${hours} hours ago`;
  }
  if (difference >= 86400) {
    const days = Math.floor(difference / 86400);

    return days === 1
      ? `${days} days ago` : `${days} days ago`;
  }
};


const getUrlParameter = (name) =>{

  name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');

  var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');

  var results = regex.exec(location.search);

  return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));

};