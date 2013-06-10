(function() {
  var DEFAULT_BRACKETS = "()[]{}''\"\"";
<<<<<<< HEAD
  var SPACE_CHAR_REGEX = /\s/;

  CodeMirror.defineOption("autoCloseBrackets", false, function(cm, val, old) {
    var wasOn = old && old != CodeMirror.Init;
    if (val && !wasOn)
      cm.addKeyMap(buildKeymap(typeof val == "string" ? val : DEFAULT_BRACKETS));
    else if (!val && wasOn)
      cm.removeKeyMap("autoCloseBrackets");
  });

=======
  var DEFAULT_EXPLODE_ON_ENTER = "[]{}";
  var SPACE_CHAR_REGEX = /\s/;

  CodeMirror.defineOption("autoCloseBrackets", false, function(cm, val, old) {
    if (old != CodeMirror.Init && old)
      cm.removeKeyMap("autoCloseBrackets");
    if (!val) return;
    var pairs = DEFAULT_BRACKETS, explode = DEFAULT_EXPLODE_ON_ENTER;
    if (typeof val == "string") pairs = val;
    else if (typeof val == "object") {
      if (val.pairs != null) pairs = val.pairs;
      if (val.explode != null) explode = val.explode;
    }
    var map = buildKeymap(pairs);
    if (explode) map.Enter = buildExplodeHandler(explode);
    cm.addKeyMap(map);
  });

  function charsAround(cm, pos) {
    var str = cm.getRange(CodeMirror.Pos(pos.line, pos.ch - 1),
                          CodeMirror.Pos(pos.line, pos.ch + 1));
    return str.length == 2 ? str : null;
  }

>>>>>>> 70ca7a2c1fcfdfbbd39abb0b182f6e418a001acd
  function buildKeymap(pairs) {
    var map = {
      name : "autoCloseBrackets",
      Backspace: function(cm) {
        if (cm.somethingSelected()) return CodeMirror.Pass;
<<<<<<< HEAD
        var cur = cm.getCursor(), line = cm.getLine(cur.line);
        if (cur.ch && cur.ch < line.length &&
            pairs.indexOf(line.slice(cur.ch - 1, cur.ch + 1)) % 2 == 0)
=======
        var cur = cm.getCursor(), around = charsAround(cm, cur);
        if (around && pairs.indexOf(around) % 2 == 0)
>>>>>>> 70ca7a2c1fcfdfbbd39abb0b182f6e418a001acd
          cm.replaceRange("", CodeMirror.Pos(cur.line, cur.ch - 1), CodeMirror.Pos(cur.line, cur.ch + 1));
        else
          return CodeMirror.Pass;
      }
    };
<<<<<<< HEAD
    var closingBrackets = [];
    for (var i = 0; i < pairs.length; i += 2) (function(left, right) {
      if (left != right) closingBrackets.push(right);
      function surround(cm) {
          var selection = cm.getSelection();
          cm.replaceSelection(left + selection + right);
=======
    var closingBrackets = "";
    for (var i = 0; i < pairs.length; i += 2) (function(left, right) {
      if (left != right) closingBrackets += right;
      function surround(cm) {
        var selection = cm.getSelection();
        cm.replaceSelection(left + selection + right);
>>>>>>> 70ca7a2c1fcfdfbbd39abb0b182f6e418a001acd
      }
      function maybeOverwrite(cm) {
        var cur = cm.getCursor(), ahead = cm.getRange(cur, CodeMirror.Pos(cur.line, cur.ch + 1));
        if (ahead != right || cm.somethingSelected()) return CodeMirror.Pass;
        else cm.execCommand("goCharRight");
      }
      map["'" + left + "'"] = function(cm) {
<<<<<<< HEAD
=======
        if (left == "'" && cm.getTokenAt(cm.getCursor()).type == "comment")
          return CodeMirror.Pass;
>>>>>>> 70ca7a2c1fcfdfbbd39abb0b182f6e418a001acd
        if (cm.somethingSelected()) return surround(cm);
        if (left == right && maybeOverwrite(cm) != CodeMirror.Pass) return;
        var cur = cm.getCursor(), ahead = CodeMirror.Pos(cur.line, cur.ch + 1);
        var line = cm.getLine(cur.line), nextChar = line.charAt(cur.ch);
        if (line.length == cur.ch || closingBrackets.indexOf(nextChar) >= 0 || SPACE_CHAR_REGEX.test(nextChar))
          cm.replaceSelection(left + right, {head: ahead, anchor: ahead});
        else
          return CodeMirror.Pass;
      };
      if (left != right) map["'" + right + "'"] = maybeOverwrite;
    })(pairs.charAt(i), pairs.charAt(i + 1));
    return map;
  }
<<<<<<< HEAD
=======

  function buildExplodeHandler(pairs) {
    return function(cm) {
      var cur = cm.getCursor(), around = charsAround(cm, cur);
      if (!around || pairs.indexOf(around) % 2 != 0) return CodeMirror.Pass;
      cm.operation(function() {
        var newPos = CodeMirror.Pos(cur.line + 1, 0);
        cm.replaceSelection("\n\n", {anchor: newPos, head: newPos}, "+input");
        cm.indentLine(cur.line + 1, null, true);
        cm.indentLine(cur.line + 2, null, true);
      });
    };
  }
>>>>>>> 70ca7a2c1fcfdfbbd39abb0b182f6e418a001acd
})();
