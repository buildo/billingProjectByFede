package billing.utils

import java.util.Date
import java.util.Calendar
import java.text.SimpleDateFormat

object DateTime {
  val format1 = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");

  def getDateString(): String = {
    val date: Date = Calendar.getInstance.getTime

    format1.format(date)
  }
}
