const spacetime = require('spacetime')
const parseRanges = require('./ranges')

const normalize = function (doc) {
  doc = doc.clone()
  if (!doc.numbers) {
    console.warn("Compromise: compromise-dates cannot find plugin dependency 'compromise-number'")
  } else {
    // convert 'two' to 2
    let num = doc.numbers()
    num.toNumber()
    num.toCardinal(false)
  }
  // expand 'aug 20-21'
  doc.contractions().expand()
  // remove adverbs
  doc.adverbs().remove()
  doc.replace('week end', 'weekend')
  // doc.replace('aug', 'august')
  return doc
}

const getDate = function (doc, context) {
  // validate context a bit
  context = context || {}
  context.timezone = context.timezone || 'ETC/UTC'
  context.today = spacetime(context.today || null, context.timezone)
  //turn 'five' into 5..
  doc = normalize(doc)
  //interpret 'between [A] and [B]'...
  return parseRanges(doc, context)
}
module.exports = getDate