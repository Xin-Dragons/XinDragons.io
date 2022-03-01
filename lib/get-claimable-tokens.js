import { partition, get } from 'lodash';

const ORPHAN = 3;

const points = {
  1: 10,
  2: 15,
  3: 22
}

function getTokens(gen1, gen2) {
  if (!gen2) {
    return 0;
  }

  if (!gen1) {
    return gen2 * ORPHAN;
  }

  const fams = Array.from(Array(gen1).keys()).map(index => {
    return {
      id: index,
      children: 0
    }
  });

  let index = 0;

  // assign 1 child to each parent
  while (gen2 > 0 && index < gen1) {
    fams[index].children = fams[index].children + 1;
    gen2--;
    index++;
  }

  index = 0;
  // fill families for optimum returns
  while (gen2 > 0 && index < gen1) {
    while (fams[index].children < 3 && gen2 > 0) {
      fams[index].children = fams[index].children + 1;
      gen2--
    }
    index++
  }

  const total = fams.filter(f => f.children).reduce((sum, item) => {
    return sum + points[item.children]
  }, gen2 * ORPHAN)

  return total;
}

export function getClaimableTokens(mints) {
  const [gen1, gen2] = partition(mints, nft => nft.metadata.symbol === 'XD');

  return getTokens(gen1.length, gen2.length);
}
