const contactAutoWriter = (beforeContact: string, afterContact: string): string => {
  if (
    !(
      ('0' <= afterContact[afterContact.length - 1] &&
        afterContact[afterContact.length - 1] <= '9') ||
      afterContact[afterContact.length - 1] == '-'
    )
  ) {
    return beforeContact;
  }

  if (beforeContact.length < afterContact.length) {
    if (
      afterContact.match(/^02$/g) ||
      afterContact.match(/^\d{3}$/g) ||
      afterContact.match(/^\d{2,3}-\d{3}$/g)
    ) {
      return afterContact + '-';
    } else if (afterContact.match(/^\d{2,3}-\d{3}-\d{5}$/g)) {
      const contactSplitList: string[] = afterContact.split('-');
      const resultContact: string =
        contactSplitList[0] +
        '-' +
        contactSplitList[1] +
        contactSplitList[2][0] +
        '-' +
        contactSplitList[2].substring(1, contactSplitList[2].length);
      return resultContact;
    } else if (
      '0' <= afterContact[afterContact.length - 1] &&
      afterContact[afterContact.length - 1] <= '9' &&
      !afterContact.match(/^\d{2,3}-\d{4}-\d{5}$/g)
    ) {
      return afterContact;
    }
  } else if (beforeContact.length > afterContact.length) {
    if (
      afterContact.toString().match(/^\d{2,3}$/g) ||
      afterContact.toString().match(/^\d{2,3}-\d{3}$/g)
    ) {
      return afterContact.substring(0, afterContact.length - 1);
    } else if (afterContact.match(/^\d{2,3}-\d{4}-\d{3}$/g)) {
      const contactSplitList: string[] = afterContact.split('-');
      const resultContact: string =
        contactSplitList[0] +
        '-' +
        contactSplitList[1].substring(0, contactSplitList[1].length - 1) +
        '-' +
        contactSplitList[1][contactSplitList[1].length - 1] +
        contactSplitList[2];
      return resultContact;
    } else {
      return afterContact;
    }
  }

  return beforeContact;
};

export default contactAutoWriter;
