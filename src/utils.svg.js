const parse = (svg, size) => {
  const r = JSON.parse(JSON.stringify(svg))

  if (r.tag === 'path') {
    r['d.resize'] = r['d.origin']
      .map(i => {
        if (i.length !== 2 || isNaN(i[0]) === true || isNaN(i[1]) === true) return [...i]
        if (i.length === 2 && isNaN(i[0]) === false && isNaN(i[1]) === false) return [i[0] + size.width / 2, i[1] + size.height / 2]
      })

    r['d'] = r['d.resize'].flat(2).join(' ')
  }

  return r
}

const move = (svg, change) => {
  const r = svg

  r['d.origin'] = r['d.origin']
    .map(i => {
      if (i.length !== 2 || isNaN(i[0]) === true || isNaN(i[1]) === true) return [...i]
      if (i.length === 2 && isNaN(i[0]) === false && isNaN(i[1]) === false) return [i[0] + change.changedX, i[1] + change.changedY]
    })

  return r
}

export { parse, move }