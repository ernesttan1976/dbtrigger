CREATE OR REPLACE FUNCTION notify_new_report() RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify('new_report_event', NEW.id::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS new_report_trigger
  ON public.report;
CREATE OR REPLACE TRIGGER new_report_trigger
AFTER INSERT ON public.report
FOR EACH ROW
EXECUTE FUNCTION notify_new_report();

CREATE OR REPLACE FUNCTION notify_edit_report() RETURNS TRIGGER AS $$
BEGIN
  PERFORM pg_notify('edit_report_event', NEW.id::text);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS edit_report_trigger
  ON public.report;
CREATE OR REPLACE TRIGGER edit_report_trigger
AFTER UPDATE ON public.report
FOR EACH ROW
EXECUTE FUNCTION notify_edit_report();