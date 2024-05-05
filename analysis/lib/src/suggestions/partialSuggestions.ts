function computeCompCharLen(suggestionStatus, completionText) {
  return suggestionStatus.compType === "partial" ? suggestionStatus.acceptedLength : completionText.length;
},__name(computeCompCharLen, "computeCompCharLen");,function computeCompletionText(completionText, suggestionStatus) {
  return suggestionStatus.compType === "partial" ? completionText.substring(0, suggestionStatus.acceptedLength) : completionText;
},__name(computeCompletionText, "computeCompletionText");